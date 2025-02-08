import { expect } from "chai";
import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Election Contract", function () {
  async function deployElectionFixture() {
    const Election = await hre.ethers.getContractFactory("Election");
    const [owner, voter1, voter2] = await hre.ethers.getSigners();
    const title = "Election 2024";
    const description = "Election Description";

    const startDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour in the future
    const endDate = startDate + 86400; // 1 day after start date

    const election = await Election.deploy(title, description, true, startDate, endDate);

    return { election, owner, voter1, voter2, title, description, startDate, endDate };
  }

  it("should prevent actions before election start", async function () {
    const { election, startDate } = await loadFixture(deployElectionFixture);

    const block = await hre.ethers.provider.getBlock("latest");
    const currentTimestamp = block?.timestamp ?? 0;

    expect(currentTimestamp).to.be.lessThan(startDate);

    await expect(election.addCandidate("Charlie", "Team C", "charlie.jpg"))
      .to.be.revertedWithCustomError(election, "ElectionNotStarted"); // Corrected
  });

  it("should prevent actions after election end", async function () {
    const { election, endDate } = await loadFixture(deployElectionFixture);

    const block = await hre.ethers.provider.getBlock("latest");
    const currentTimestamp = block?.timestamp ?? 0;

    const timeToAdvance = (endDate - currentTimestamp) + 3600;
    await hre.ethers.provider.send("evm_increaseTime", [timeToAdvance]);
    await hre.ethers.provider.send("evm_mine", []);

    await expect(election.addCandidate("David", "Team D", "david.jpg"))
      .to.be.revertedWithCustomError(election, "ElectionEnded");
  });

  it("should prevent adding a candidate after election ends", async function () {
    const { election, endDate } = await loadFixture(deployElectionFixture);

    const block = await hre.ethers.provider.getBlock("latest");
    const currentTimestamp = block?.timestamp ?? 0;

    // Fast forward to after the election ends
    const timeToAdvance = (endDate - currentTimestamp) + 3600;
    await hre.ethers.provider.send("evm_increaseTime", [timeToAdvance]);
    await hre.ethers.provider.send("evm_mine", []);

    await expect(
      election.addCandidate("Invalid", "Team X", "invalid.jpg")
    ).to.be.revertedWithCustomError(election, "ElectionEnded");
  });

  it("should handle edge cases for adding a candidate", async function () {
    const { election, startDate } = await loadFixture(deployElectionFixture);

    const block = await hre.ethers.provider.getBlock("latest");
    const currentTimestamp = block?.timestamp ?? 0;
    const timeToAdvance = (startDate - currentTimestamp) + 3600;
    await hre.ethers.provider.send("evm_increaseTime", [timeToAdvance]);
    await hre.ethers.provider.send("evm_mine", []);

    // Now try to add a candidate with the same name to test error
    await election.addCandidate("Charlie", "Team C", "charlie.jpg");
    await expect(election.addCandidate("Charlie", "Team C", "charlie.jpg"))
      .to.be.revertedWithCustomError(election, "CandidateAlreadyExists");

    const candidates = await election.getCandidates();
    expect(candidates.length).to.be.greaterThan(0);
  });

  it("should allow adding candidates and retrieve them after election starts", async function () {
    const { election, startDate } = await loadFixture(deployElectionFixture);

    const block = await hre.ethers.provider.getBlock("latest");
    const currentTimestamp = block?.timestamp ?? 0;

    const timeToAdvance = (startDate - currentTimestamp) + 3600;
    await hre.ethers.provider.send("evm_increaseTime", [timeToAdvance]);
    await hre.ethers.provider.send("evm_mine", []);

    await election.addCandidate("Alice", "Team A", "alice.jpg");
    await election.addCandidate("Bob", "Team B", "bob.jpg");

    const candidates = await election.getCandidates();
    expect(candidates.length).to.equal(2);
    expect(candidates[0].name).to.equal("Alice");
    expect(candidates[1].name).to.equal("Bob");
  });

  it("should prevent voting for invalid candidate", async function () {
    const { election, startDate, voter1 } = await loadFixture(deployElectionFixture);

    const block = await hre.ethers.provider.getBlock("latest");
    const currentTimestamp = block?.timestamp ?? 0;

    const timeToAdvance = (startDate - currentTimestamp) + 3600;
    await hre.ethers.provider.send("evm_increaseTime", [timeToAdvance]);
    await hre.ethers.provider.send("evm_mine", []);

    await election.addCandidate("Alice", "Team A", "alice.jpg");
    await election.addVoters([voter1.address]);

    await expect(election.connect(voter1).castVote(999))
      .to.be.revertedWith("Invalid candidate. Please enter a valid candidate ID");
  });

  it("should prevent double voting", async function () {
    const { election, startDate, voter1 } = await loadFixture(deployElectionFixture);

    const block = await hre.ethers.provider.getBlock("latest");
    const currentTimestamp = block?.timestamp ?? 0;

    const timeToAdvance = (startDate - currentTimestamp) + 3600;
    await hre.ethers.provider.send("evm_increaseTime", [timeToAdvance]);
    await hre.ethers.provider.send("evm_mine", []);

    await election.addCandidate("Alice", "Team A", "alice.jpg");
    await election.addVoters([voter1.address]);

    // Cast the first vote
    await election.connect(voter1).castVote(1);

    // Try to cast another vote
    await expect(election.connect(voter1).castVote(1))
      .to.be.revertedWith("You have already voted.");
  });

  it("should prevent registering voter after election end", async function () {
    const { election, endDate, voter1 } = await loadFixture(deployElectionFixture);

    const block = await hre.ethers.provider.getBlock("latest");
    const currentTimestamp = block?.timestamp ?? 0;

    const timeToAdvance = (endDate - currentTimestamp) + 3600;
    await hre.ethers.provider.send("evm_increaseTime", [timeToAdvance]);
    await hre.ethers.provider.send("evm_mine", []);

    await expect(election.addVoters([voter1.address]))
      .to.be.revertedWithCustomError(election, "ElectionEnded");
  });

  it("should prevent adding a voter before election starts", async function () {
    const { election, startDate, voter1 } = await loadFixture(deployElectionFixture);

    // Attempt to add a voter before the election starts
    await expect(election.addVoters([voter1.address]))
      .to.be.revertedWithCustomError(election, "ElectionNotStarted");
  });

  it("Should return a voter", async function () {
    const { election, startDate, voter1 } = await loadFixture(deployElectionFixture);

    // Advance time to start the election
    const block = await hre.ethers.provider.getBlock("latest");
    const currentTimestamp = block?.timestamp ?? 0;
    const timeToAdvance = (startDate - currentTimestamp) + 3600;
    await hre.ethers.provider.send("evm_increaseTime", [timeToAdvance]);
    await hre.ethers.provider.send("evm_mine", []);

    // Add a candidate and a voter
    await election.addCandidate("Alice", "Team A", "alice.jpg");
    await election.addVoters([voter1.address]);

    // Cast a vote
    await election.connect(voter1).castVote(1);

    // Retrieve voter information
    const [voted, candidateId] = await election.getVoter(voter1.address);

    // Check the voter details
    expect(voted).to.be.true;
    expect(candidateId).to.equal(1);
  });

  it("should handle invalid dates in the constructor", async function () {
    const Election = await hre.ethers.getContractFactory("Election");

    const startDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour in the future
    const endDate = startDate - 1000; // End date before start date

    await expect(
      Election.deploy("Election 2024", "Invalid Dates", true, startDate, endDate)
    ).to.be.revertedWithCustomError(Election, "ElectionEnded");
  });

  it("should handle start date equal to end date", async function () {
    const Election = await hre.ethers.getContractFactory("Election");

    const startDate = Math.floor(Date.now() / 1000) + 3600;
    const endDate = startDate; // Equal start and end date

    await expect(
      Election.deploy("Election 2024", "Start date equals end date", true, startDate, endDate)
    ).to.be.revertedWithCustomError(Election, "ElectionEnded");
  });
});
