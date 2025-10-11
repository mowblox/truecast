
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre from "hardhat";


describe("ElectionFactory Contract", function () {
  async function deployElectionFactoryFixture() {
    // Get the ContractFactory and Signers here.
    const [owner, addr1] = await hre.ethers.getSigners();

    const ElectionFactory = await hre.ethers.getContractFactory("ElectionFactory");
    const electionFactory = await ElectionFactory.deploy();

    // await electionFactory.deployed();

    // Return the contract and accounts to be used in the tests
    return { electionFactory, owner, addr1 };
  }

  it("Should deploy the contract and set the owner correctly", async function () {
    const { electionFactory, owner } = await loadFixture(deployElectionFactoryFixture);

    expect(await electionFactory.getOwner()).to.equal(owner.address);
  });

  it("Should create a new election", async function () {
    const { electionFactory, addr1 } = await loadFixture(deployElectionFactoryFixture);

    const newElection = await electionFactory.createElection(
      "Election Title",
      "Election Description",
      true,
      1234567890,
      1234567899
    );

    // Wait for the transaction to be mined
    await newElection.wait();

    const elections = await electionFactory.getElections();
    expect(elections.length).to.equal(1);
  });

  it("Should emit an event when a new election is created", async function () {
    const { electionFactory } = await loadFixture(deployElectionFactoryFixture);

    await expect(electionFactory.createElection(
      "Election Title",
      "Election Description",
      true,
      1234567890,
      1234567899
    )).to.emit(electionFactory, "ElectionCreated");
  });

  it("Should only allow the owner to delete an election", async function () {
    const { electionFactory, owner, addr1 } = await loadFixture(deployElectionFactoryFixture);

    // Create an election first
    const newElection = await electionFactory.createElection(
      "Election Title",
      "Election Description",
      true,
      1234567890,
      1234567899
    );

    await newElection.wait();

    // Attempt to delete the election with a non-owner account
    await expect(electionFactory.connect(addr1).deleteElection(0))
      .to.be.revertedWithCustomError(electionFactory, "Unauthorized");

    // Delete the election with the owner account
    await electionFactory.connect(owner).deleteElection(0);

    const elections = await electionFactory.getElections();
    expect(elections[0]).to.equal(hre.ethers.ZeroAddress);  // Use ethers.constants.AddressZero to check the zero address
  });

  it("Should return the correct total number of elections", async function () {
    const { electionFactory } = await loadFixture(deployElectionFactoryFixture);

    // Check initial total elections count
    expect(await electionFactory.getTotalElections()).to.equal(0);

    // Create an election
    const newElection = await electionFactory.createElection(
      "Election Title",
      "Election Description",
      true,
      1234567890,
      1234567899
    );

    await newElection.wait();

    // Check total elections count after creating one
    expect(await electionFactory.getTotalElections()).to.equal(1);
  });

  it("should return all elections created by the owner", async function () {
    const { electionFactory, owner } = await loadFixture(deployElectionFactoryFixture);
    // Create an election
    const tx = await electionFactory.createElection(
      "Presidential Election",
      "Vote for president",
      true,
      1713302400,
      1715908800
    );
    await tx.wait();

    // Call getOwnerElections
    const elections = await electionFactory.getOwnerElections(owner);

    // Should return at least one address (the election contract)
    expect(elections.length).to.be.greaterThan(0);
  });
});
