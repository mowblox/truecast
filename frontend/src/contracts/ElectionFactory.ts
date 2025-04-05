export const getFactoryAddress = (chainId: number) => {
  switch (chainId) {
    case 11155111:
      return '0xdB78718Db7EE8D2cFd57c27FdB4Ae5B00A656DBe'; // sepolia
    case 560048:
      return '0xF7E2Be9007fEaAcEB821D98011975A78034cCDC6' // hoodi
    case 534351:
      return '0x48Ff06D4D317b4030A90b26F9916eE9D04E1f868'; // scroll_sepolia
    case 59141:
      return '0x4494b1e9Af1591D4d1E93AA154ded3EB0E7f8f99' // linea_sepolia
    default:
      return '0x0000000000000000000000000000000000000000';
  }
}


export const ELECTION_FACTORY_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"electionAddress","type":"address"}],"name":"ElectionCreated","type":"event"},{"inputs":[{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"bool","name":"_isPublic","type":"bool"},{"internalType":"uint256","name":"_startDate","type":"uint256"},{"internalType":"uint256","name":"_endDate","type":"uint256"}],"name":"createElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_electionID","type":"uint256"}],"name":"deleteElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getElections","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalElections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]