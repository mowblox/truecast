export const getFactoryAddress = (chainId: number) => {
  switch (chainId) {
    case 11155111:
      return '0x3cfed39DC975eA858e575bA13F5Fb1360829F8bb'; // sepolia
    case 534351:
      return '0xde7CF7778F886B109f8d18b17E6CE2749F26DE85'; // scroll_sepolia
    case 59141:
      return '0x06cCB617f024e3b69aE5C777557F2174Ec111b76' // linea_sepolia
    case 31337:
      return '0xF7E2Be9007fEaAcEB821D98011975A78034cCDC6' // hardhat
    default:
      return '0x0000000000000000000000000000000000000000';
  }
}


export const ELECTION_FACTORY_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "electionAddress",
        "type": "address"
      }
    ],
    "name": "ElectionCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "_isPublic",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "_startDate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_endDate",
        "type": "uint256"
      }
    ],
    "name": "createElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_electionID",
        "type": "uint256"
      }
    ],
    "name": "deleteElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getElections",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getOwnerElections",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPublicElections",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalElections",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]