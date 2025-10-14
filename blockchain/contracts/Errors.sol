// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
// Custom errors
error ElectionNotStarted();
error ElectionEnded();
error CandidateAlreadyExists();
error AlreadyVoted();
error VoterAlreadyRegistered();
error InvalidCandidate();
error Unauthorized();
error ElectionIsAlreadyLive();
error ElectionIsNotLive();
error InvalidElectionDuration();
