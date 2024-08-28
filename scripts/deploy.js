
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

    //0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9