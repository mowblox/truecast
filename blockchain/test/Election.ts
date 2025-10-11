import { expect } from "chai";
import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Election Contract", function () {
  async function deployElectionFixture() {
    const Election = await hre.ethers.getContractFactory("Election");
    const [owner, voter1, voter2, nonOwner] = await hre.ethers.getSigners();
    const title = "Election 2024";
    const description = "Election Description";

    const startDate = Date.now() + 3600 * 1000; // 1 hour in the future (ms)
    const endDate = startDate + 86400 * 1000; // 1 day after start date

    const election = await Election.deploy(
      title,
      description,
      true,
      startDate,
      endDate,
      owner
    );

    return {
      election,
      owner,
      voter1,
      voter2,
      nonOwner,
      title,
      description,
      startDate,
      endDate,
    };
  }

  it("should prevent creating an election with an invalid end date", async function () {
    const Election = await hre.ethers.getContractFactory("Election");
    const [owner] = await hre.ethers.getSigners();

    const title = "Invalid Election";
    const description = "This should fail";
    const isPublic = true;

    const startDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour in the future
    const invalidEndDate = startDate - 3600; // 1 hour before start date

    await expect(
      Election.deploy(
        title,
        description,
        isPublic,
        startDate,
        invalidEndDate,
        owner
      )
    ).to.be.revertedWithCustomError(Election, "InvalidEndDate");
  });

  it("should prevent non-owners from adding candidates", async function () {
    const { election, nonOwner } = await loadFixture(deployElectionFixture);
    await expect(
      election
        .connect(nonOwner)
        .addCandidate("Charlie", "Team C", "charlie.jpg")
    ).to.be.revertedWithCustomError(election, "Unauthorized");
  });

  it("should prevent non-owners from adding voters", async function () {
    const { election, nonOwner, voter1 } = await loadFixture(
      deployElectionFixture
    );
    await expect(
      election.connect(nonOwner).addVoters([voter1.address])
    ).to.be.revertedWithCustomError(election, "Unauthorized");
  });

  it("should allow owner to extend the election date", async function () {
    const { election, owner, endDate } = await loadFixture(
      deployElectionFixture
    );
    const newEndDate = endDate + 86400;
    await expect(election.connect(owner).extendElectionDate(newEndDate))
      .to.emit(election, "ElectionExtended")
      .withArgs(newEndDate);
  });

  it("should prevent non-owners from extending the election date", async function () {
    const { election, nonOwner, endDate } = await loadFixture(
      deployElectionFixture
    );
    const newEndDate = endDate + 86400;
    await expect(
      election.connect(nonOwner).extendElectionDate(newEndDate)
    ).to.be.revertedWithCustomError(election, "Unauthorized");
  });

  it("should correctly return all candidates", async function () {
    const { election, owner } = await loadFixture(deployElectionFixture);
    await election.connect(owner).addCandidate("Alice", "Team A", "alice.jpg");
    await election.connect(owner).addCandidate("Bob", "Team B", "bob.jpg");
    const candidates = await election.getCandidates();
    expect(candidates.length).to.equal(2);
    expect(candidates[0].name).to.equal("Alice");
    expect(candidates[1].name).to.equal("Bob");
  });

  it("should prevent adding duplicate candidates", async function () {
    const { election, owner, startDate } = await loadFixture(
      deployElectionFixture
    );
    const latestBlock = await hre.ethers.provider.getBlock("latest");
    if (!latestBlock) throw new Error("Failed to fetch latest block");
    await election.connect(owner).addCandidate("Alice", "Team A", "alice.jpg");
    await expect(
      election.connect(owner).addCandidate("Alice", "Team A", "alice.jpg")
    ).to.be.revertedWithCustomError(election, "CandidateAlreadyExists");
  });

  it("should prevent adding candidate during ongoing election", async function () {
    const { election, owner, startDate } = await loadFixture(
      deployElectionFixture
    );
    const latestBlock = await hre.ethers.provider.getBlock("latest");
    if (!latestBlock) throw new Error("Failed to fetch latest block");
    const timeToAdvance =
      Math.floor(startDate / 1000) - latestBlock.timestamp + 1;
    await hre.ethers.provider.send("evm_increaseTime", [timeToAdvance]);
    await hre.ethers.provider.send("evm_mine", []);

    await expect(
      election.connect(owner).addCandidate("David", "Team D", "david.jpg")
    ).to.be.revertedWithCustomError(election, "ElectionAlreadyStarted");
  });

  it("should prevent adding voters during ongoing election", async function () {
    const { election, owner, startDate, voter1 } = await loadFixture(
      deployElectionFixture
    );
    const latestBlock = await hre.ethers.provider.getBlock("latest");
    if (!latestBlock) throw new Error("Failed to fetch latest block");
    const timeToAdvance =
      Math.floor(startDate / 1000) - latestBlock.timestamp + 1;
    await hre.ethers.provider.send("evm_increaseTime", [timeToAdvance]);
    await hre.ethers.provider.send("evm_mine", []);

    await expect(
      election.connect(owner).addVoters([voter1.address])
    ).to.be.revertedWithCustomError(election, "ElectionAlreadyStarted");
  });

  it("should prevent double voting", async function () {
    const { election, voter1, owner, startDate } = await loadFixture(
      deployElectionFixture
    );
    await election.connect(owner).addCandidate("Alice", "Team A", "alice.jpg");

    const latestBlock = await hre.ethers.provider.getBlock("latest");
    if (!latestBlock) throw new Error("Failed to fetch latest block");
    const timeToAdvance =
      Math.floor(startDate / 1000) - latestBlock.timestamp + 1;
    await hre.ethers.provider.send("evm_increaseTime", [timeToAdvance]);
    await hre.ethers.provider.send("evm_mine", []);

    await election.connect(voter1).castVote(1);
    await expect(
      election.connect(voter1).castVote(1)
    ).to.be.revertedWithCustomError(election, "AlreadyVoted");
  });

  it("should prevent voting for an invalid candidate", async function () {
    const { election, voter1, owner, startDate } = await loadFixture(
      deployElectionFixture
    );

    const latestBlock = await hre.ethers.provider.getBlock("latest");
    if (!latestBlock) throw new Error("Failed to fetch latest block");
    const timeToAdvance =
      Math.floor(startDate / 1000) - latestBlock.timestamp + 1;
    await hre.ethers.provider.send("evm_increaseTime", [timeToAdvance]);
    await hre.ethers.provider.send("evm_mine", []);

    const invalidCandidateId = 99;
    await expect(election.connect(voter1).castVote(invalidCandidateId))
      .to.be.revertedWithCustomError(election, "InvalidCandidate");
  });

  it("should return all elections voter partook in", async function () {
    const { election, voter1, startDate } = await loadFixture(
      deployElectionFixture
    );

    const latestBlock = await hre.ethers.provider.getBlock("latest");
    if (!latestBlock) throw new Error("Failed to fetch latest block");
    const timeToAdvance =
      Math.floor(startDate / 1000) - latestBlock.timestamp + 1;
    await hre.ethers.provider.send("evm_increaseTime", [timeToAdvance]);
    await hre.ethers.provider.send("evm_mine", []);

    expect(election.connect(voter1).getVoterElections(voter1));
  });
});
