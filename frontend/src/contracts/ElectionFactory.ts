export const getFactoryAddress = (chainId: number) => {
  switch (chainId) {
    case 1:
      return '0x0000000000000000000000000000000000000000'; // ethereum
    case 43114:
      return '0x0000000000000000000000000000000000000000'; // avalanche
    case 11155111:
      return '0x5c4b9b14f30a2d320b81044Ab1a0e407c9b6833C'; // sepolia
    case 17000:
      return '0x9fca09E8579C43753f37727Ba87d5e4eAbE2EDaD'; // holesky
    case 43113:
      return '0xe70723B89e1c9ccCA17b7a9D2149BC6C3DEB01CB'; // avalanche_fuji
    case 534351:
      return '0x255e1031D59a200FEDc7DE3Bb0205493685297b8'; // scroll_sepolia
    case 59141:
      return '0x6043DFca8ee0CDD60028e7262f08c1b59f256231'; // linea_sepolia
    case 31337:
      return '0xF7E2Be9007fEaAcEB821D98011975A78034cCDC6'; // hardhat
    default:
      return '0x0000000000000000000000000000000000000000'; // default
  }
}


export const ELECTION_FACTORY_ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "Unauthorized", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "electionAddress", "type": "address" }], "name": "ElectionCreated", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "_title", "type": "string" }, { "internalType": "string", "name": "_description", "type": "string" }, { "internalType": "bool", "name": "_isPublic", "type": "bool" }], "name": "createElection", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_electionID", "type": "uint256" }], "name": "deleteElection", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getElections", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getOwnerElections", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPublicElections", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTotalElections", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]