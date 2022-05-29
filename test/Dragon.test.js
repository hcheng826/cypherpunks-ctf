const { ethers } = require("hardhat");
const hre = require('hardhat');

describe.only("Dragon", function () {
  it("test", async function () {
    const provider = ethers.provider;
    const [deployer, player] = await hre.ethers.getSigners();

    let dragonFactory = await ethers.getContractFactory("DragonFactory");
    dragonFactory = await dragonFactory.connect(deployer).deploy();
    await dragonFactory.deployed();

    const dragonAddress = await dragonFactory.createInstance(player.address);
    console.log('dragonAddress:', dragonAddress);

    const dragon = await ethers.getContractAt(
      require('../artifacts/contracts/Dragon.sol/Dragon.json').abi,
      dragonAddress,
      player
    );

    console.log('complete:', await dragon.complete())
  });
});
