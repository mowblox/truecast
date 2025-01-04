export const getFactoryAddress = (chainId: number) => {
  switch (chainId) {
    case 11155111:
      return '0xe96e8F2A1A3c4a6464d51a645CFFA3306c16c456'; //sepolia
    case 534351:
      return '0xa5d67391AC8d560B5f94175868961C306942cF59'; //linea
    case 59141:
      return '0xa5d67391AC8d560B5f94175868961C306942cF59' //scroll
    case 17000:
      return '0xDdF0f6f45d7Ee134779C6c05c7eE6a9231BD8Aea' //holesky
    default:
      return '0x0000000000000000000000000000000000000000';
  }
}


export const ELECTION_FACTORY_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"electionAddress","type":"address"}],"name":"ElectionCreated","type":"event"},{"inputs":[{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"bool","name":"_isPublic","type":"bool"},{"internalType":"uint256","name":"_startDate","type":"uint256"},{"internalType":"uint256","name":"_endDate","type":"uint256"}],"name":"createElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_electionID","type":"uint256"}],"name":"deleteElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getElections","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalElections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]