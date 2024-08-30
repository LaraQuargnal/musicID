async function main() {
  const MusicID = await hre.ethers.getContractFactory("MusicID");
  const musicID = await MusicID.deploy();
  await musicID.deployed();

  console.log("MusicID contract deployed to:", musicID.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
// 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707
// 0x0165878A594ca255338adfa4d48449f69242Eb8F
// 0x5FbDB2315678afecb367f032d93F642f64180aa3
// 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
// 0x5FbDB2315678afecb367f032d93F642f64180aa3
// 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
// 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Chrome does not update Hardhat ETH balance. Works on Edge...3hrs gone on this.
// hint: use same account on metamask and hardhat in terminal
// change network in metamask to localhost:8545 (Hardhat Network 1337)
// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
// 0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e
// 0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1

// npx hardhat compile
// npx hardhat run scripts/deploy.js --network localhost
// 0x09635F643e140090A9A8Dcd712eD6285858ceBef

// npx hardhat node
// npx hardhat console --network localhost
