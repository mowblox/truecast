// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "./Election.sol";

contract ElectionFactory {
    address owner;

    // Array to keep track of the elections
    address[] elections;
    mapping(address => address[]) private ownerElections;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    // Event emitted when an election is created
    event ElectionCreated(address electionAddress);

    // Function to return the owner address (added this function)
    function getOwner() public view returns (address) {
        return owner;
    }

    // Function to create new election
    function createElection(
        string memory _title,
        string memory _description,
        bool _isPublic,
        uint _startDate,
        uint _endDate
    ) public {
        // Create a new instance of the Election contract
        Election newElection = new Election(
            _title,
            _description,
            _isPublic,
            _startDate,
            _endDate,
            msg.sender
        );

        // Store the address of the newly created election
        elections.push(address(newElection));

        // Store under owner address
        ownerElections[msg.sender].push(address(newElection));

        // Emit an event for the creation of the new contract
        emit ElectionCreated(address(newElection));
    }

    // return just elections created by owner
    function getOwnerElections() public view returns (address[] memory) {
        require(ownerElections[msg.sender].length > 0, "No elections found for this address");
        return ownerElections[msg.sender];
    }

    // Function to get addresses of all elections
    function getElections() public view returns (address[] memory) {
        return elections;
    }

    // Function to delete an election
    function deleteElection(uint _electionID) public onlyOwner {
        delete elections[_electionID];
    }

    // Function to retrieve the total number of elections
    function getTotalElections() public view returns (uint) {
        return elections.length;
    }
}
