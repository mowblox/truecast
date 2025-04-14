export const getFactoryAddress = (chainId: number) => {
  switch (chainId) {
    case 11155111:
      return '0x6bE4522142D8fE871376d6eD7Ac7B4d50c856625'; // sepolia
    case 534351:
      return '0xdD242bA5D459758d5DF8493e5328d4fAfD498727'; // scroll_sepolia
    case 59141:
      return '0x21F97500d8B7B6FabaCcD6af8447a81924394513' // linea_sepolia
    case 31337:
      return '0xF7E2Be9007fEaAcEB821D98011975A78034cCDC6' // hardhat
    default:
      return '0x0000000000000000000000000000000000000000';
  }
}


export const ELECTION_FACTORY_ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "electionAddress", "type": "address" }], "name": "ElectionCreated", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "_title", "type": "string" }, { "internalType": "string", "name": "_description", "type": "string" }, { "internalType": "bool", "name": "_isPublic", "type": "bool" }, { "internalType": "uint256", "name": "_startDate", "type": "uint256" }, { "internalType": "uint256", "name": "_endDate", "type": "uint256" }], "name": "createElection", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_electionID", "type": "uint256" }], "name": "deleteElection", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getElections", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTotalElections", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]