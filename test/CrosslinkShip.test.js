const { ethers } = require("hardhat");
const hre = require('hardhat');

describe("CrossLink", function () {
  it("test", async function () {
    const provider = ethers.provider;
    const [deployer, player] = await hre.ethers.getSigners();

    const clsFactory = await ethers.getContractFactory("CrosslinkShip");
    let cls = await clsFactory.connect(deployer).deploy();
    await cls.deployed();

    cls = cls.connect(player);

    console.log('cls address: ', cls.address);
    console.log('cls htcIsHauled: ', await cls.htcIsHauled());
    console.log('cls anchor: ', await cls.anchor());

    console.log('block number:', await provider.getBlockNumber());
    const dropShipAnchorTx = await cls.dropShipAnchor(await provider.getBlockNumber() + 50002);
    await dropShipAnchorTx.wait();

    console.log('cls anchor: ', await cls.anchor());
    const sailAwayTx = await cls.sailAway();
    await sailAwayTx.wait();
    console.log('cls htcIsHauled: ', await cls.htcIsHauled());

  });
});
