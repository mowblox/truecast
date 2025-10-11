// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "./Errors.sol";
import "./Election.sol";

contract ElectionFactory {
    address owner;

    // Array to keep track of the elections
    address[] elections;
    address[] _publicElections;
    mapping(address => address[]) private ownerElections;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
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

        // Store if public election
        if (_isPublic) {
            _publicElections.push(address(newElection));
        }

        // Emit an event for the creation of the new contract
        emit ElectionCreated(address(newElection));
    }

    // return just elections created by owner
    function getOwnerElections(
        address account
    ) public view returns (address[] memory) {
        return ownerElections[account];
    }

    // Function to get addresses of all elections
    function getElections() public view returns (address[] memory) {
        return elections;
    }

    // Function to get addresses of all elections
    function getPublicElections() public view returns (address[] memory) {
        return _publicElections;
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
