export const getFactoryAddress = (chainId: number) => {
  switch (chainId) {
    case 1:
      return '0x0000000000000000000000000000000000000000'; // ethereum
    case 43114:
      return '0x0000000000000000000000000000000000000000'; // avalanche
    case 11155111:
      return '0xf5700eD88D581DE26F170fd6579B79A360A8A598'; // sepolia
    case 17000:
      return '0x7f35C105b739a5bB8945664E429BCA3E24CbFc74'; // holesky
    case 43113:
      return '0x18894B2EC99FBfD397c9c7FD1bcbBe91E7E98B07'; // avalanche_fuji
    case 534351:
      return '0x6Db7371486ef99b58E217ea0B0561Ab79B9268f6'; // scroll_sepolia
    case 59141:
      return '0x085f8B30fd7584328d38e720dE4F1E5434A123B9'; // linea_sepolia
    case 31337:
      return '0xF7E2Be9007fEaAcEB821D98011975A78034cCDC6'; // hardhat
    default:
      return '0x0000000000000000000000000000000000000000'; // default
  }
}


export const ELECTION_FACTORY_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"Unauthorized","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"electionAddress","type":"address"}],"name":"ElectionCreated","type":"event"},{"inputs":[{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"bool","name":"_isPublic","type":"bool"},{"internalType":"uint256","name":"_startDate","type":"uint256"},{"internalType":"uint256","name":"_endDate","type":"uint256"}],"name":"createElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_electionID","type":"uint256"}],"name":"deleteElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getElections","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getOwnerElections","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPublicElections","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalElections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]