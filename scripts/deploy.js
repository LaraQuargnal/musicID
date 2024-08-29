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
// on Chrome does not update Hardhat ETH balance. Works on Edge...3hrs gone on this.
// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
