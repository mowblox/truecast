// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
// Custom errors
error ElectionNotStarted();
error ElectionAlreadyStarted();
error ElectionEnded();
error InvalidEndDate();
error CandidateAlreadyExists();
error AlreadyVoted();
error VoterAlreadyRegistered();
error InvalidCandidate(uint candidateId);
error Unauthorized();

contract Election {
    string public title;
    string public description;
    bool public isPublic;
    uint public startDate;
    uint public endDate;

    address public owner;

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
    event CandidateAdded(uint id, string name);
    event VotersAdded(address[] voters);
     event ElectionExtended(uint newEndDate);

    constructor(
        string memory _title,
        string memory _description,
        bool _isPublic,
        uint _startDate,
        uint _endDate
    ) {
        if (_startDate >= _endDate) revert InvalidEndDate();
        title = _title;
        description = _description;
        isPublic = _isPublic;
        startDate = _startDate;
        endDate = _endDate;
        owner = msg.sender;
    }

    modifier onlyWhileOpen() {
        if (block.timestamp < startDate) revert ElectionNotStarted();
        if (block.timestamp > endDate) revert ElectionEnded();
        _;
    }

    modifier isElectionActive() {
    if (block.timestamp >= startDate && block.timestamp < endDate) revert ElectionAlreadyStarted();
    if (block.timestamp >= endDate) revert ElectionEnded();
    _;
}

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    function addCandidate(
        string memory _name,
        string memory _team,
        string memory _image
    ) public onlyOwner isElectionActive {
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
        emit CandidateAdded(candidatesCount, _name);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidatesCount);
        for (uint i = 1; i <= candidatesCount; i++) {
            allCandidates[i - 1] = candidates[i];
        }
        return allCandidates;
    }

    function addVoters(
        address[] memory _voterAddresses
    ) public onlyOwner isElectionActive {
        uint length = _voterAddresses.length;
        for (uint i = 0; i < length; i++) {
            if (voters[_voterAddresses[i]].registered)
                revert VoterAlreadyRegistered();
            voters[_voterAddresses[i]] = Voter(true, false, 0);
        }
        emit VotersAdded(_voterAddresses);
    }

    function getVoter(address _voterAddress) public view returns (bool, uint) {
        Voter memory voter = voters[_voterAddress];
        return (voter.voted, voter.candidateId);
    }

    function castVote(uint _candidateId) public onlyWhileOpen {
        if (voters[msg.sender].voted) revert AlreadyVoted();
        if (_candidateId == 0 || _candidateId > candidatesCount)
            revert InvalidCandidate(_candidateId);

        voters[msg.sender].voted = true;
        voters[msg.sender].candidateId = _candidateId;

        candidates[_candidateId].voteCount++;

        emit VoteCast(msg.sender, _candidateId);
    }

    function getElectionSummary() public view returns (Candidate[] memory, uint) {
        uint totalVotes = 0;
        Candidate[] memory allCandidates = new Candidate[](candidatesCount);

        for (uint i = 1; i <= candidatesCount; ) {
            allCandidates[i - 1] = candidates[i];
            unchecked {
                totalVotes += candidates[i].voteCount;
            }
            i++;
        }

        return (allCandidates, totalVotes);
    }

     function extendElectionDate(uint newEndDate) public onlyOwner {
        if (newEndDate <= endDate) revert ElectionEnded();
        endDate = newEndDate;
        emit ElectionExtended(newEndDate);
    }
}
