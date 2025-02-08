// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
// Custom errors
error ElectionNotStarted();
error ElectionEnded();
error CandidateAlreadyExists();
error AlreadyVoted();
error VoterAlreadyRegistered();
error InvalidCandidateID();

contract Election {
    string public title;
    string public description;
    bool public isPublic;
    uint public startDate;
    uint public endDate;

    uint public candidatesCount;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        string team;
        string image;
    }
    struct Voter {
        bool registered;
        bool voted;
        uint candidateId;
    }

    mapping(uint => Candidate) candidates;
    mapping(address => Voter) voters;

    event VoteCast(address indexed voter, uint indexed candidateId);

    constructor(
        string memory _title,
        string memory _description,
        bool _isPublic,
        uint _startDate,
        uint _endDate
    ) {
        if (_startDate >= _endDate) revert ElectionEnded();
        title = _title;
        description = _description;
        isPublic = _isPublic;
        startDate = _startDate;
        endDate = _endDate;
    }

    modifier onlyWhileOpen() {
        if (block.timestamp < startDate) revert ElectionNotStarted();
        if (block.timestamp > endDate) revert ElectionEnded();
        _;
    }

    function addCandidate(
        string memory _name,
        string memory _team,
        string memory _image
    ) public onlyWhileOpen {
        for (uint i = 1; i <= candidatesCount; i++) {
            if (
                keccak256(abi.encodePacked(candidates[i].name)) ==
                keccak256(abi.encodePacked(_name))
            ) {
                revert CandidateAlreadyExists();
            }
        }
        candidatesCount++;
        candidates[candidatesCount] = Candidate(
            candidatesCount,
            _name,
            0,
            _team,
            _image
        );
    }

    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidatesCount);
        for (uint i = 1; i <= candidatesCount; i++) {
            allCandidates[i - 1] = candidates[i];
        }
        return allCandidates;
    }

    function addVoters(address[] memory _voterAddresses) public onlyWhileOpen {
        uint length = _voterAddresses.length;
        for (uint i = 0; i < length; i++) {
            require(
                !voters[_voterAddresses[i]].registered,
                "Voter is already registered"
            );
            voters[_voterAddresses[i]] = Voter(true, false, 0);
        }
    }

    function getVoter(address _voterAddress) public view returns (bool, uint) {
        Voter memory voter = voters[_voterAddress];
        return (voter.voted, voter.candidateId);
    }

    function castVote(uint _candidateId) public onlyWhileOpen {
        require(!voters[msg.sender].voted, "You have already voted.");
        require(
            _candidateId > 0 && _candidateId <= candidatesCount,
            "Invalid candidate. Please enter a valid candidate ID"
        );

        voters[msg.sender].voted = true;
        voters[msg.sender].candidateId = _candidateId;

        candidates[_candidateId].voteCount++;

        emit VoteCast(msg.sender, _candidateId);
    }
}
