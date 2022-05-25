const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("fomo4DAttack", function () {
  it("deploy", async function () {
    const fomo4DFactory = await ethers.getContractFactory("Fomo4D");
    const fomo4D = await fomo4DFactory.deploy();
    await fomo4D.deployed();

    console.log('owner: ', (await fomo4D.owner()).toString());

    const fomo4DAttackFactory = await ethers.getContractFactory("Fomo4DAttack");
    const fomo4DAttack = await fomo4DAttackFactory.deploy(fomo4D.address);
    await fomo4DAttack.deployed();

    console.log('owner: ', (await fomo4D.owner()).toString());
  });
});
