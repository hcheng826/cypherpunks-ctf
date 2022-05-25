const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("paperScissorsStoneAttack", function () {
  it("deploy", async function () {
    const paperScissorsStoneFactory = await ethers.getContractFactory("PaperScissorsStone");
    const paperScissorsStone = await paperScissorsStoneFactory.deploy();
    await paperScissorsStone.deployed();

    const paperScissorsStoneAttackFactory = await ethers.getContractFactory("PaperScissorsStoneAttack");
    const paperScissorsStoneAttack = await paperScissorsStoneAttackFactory.deploy(paperScissorsStone.address);
    await paperScissorsStoneAttack.deployed();

    console.log('winTimes: ', (await paperScissorsStone.winTimes()).toString());

    await paperScissorsStoneAttack.guessAttack();
    // const txRc = await txRes1.wait();
    // console.log('tx hash: ', txRc.transactionHash);

    // await paperScissorsStone.guess(0);
    // await paperScissorsStone.guess(2);
    // await paperScissorsStone.guess(1);
    // await paperScissorsStone.guess(1);
    // await paperScissorsStone.guess(1);

    console.log('winTimes: ', (await paperScissorsStone.winTimes()).toString());
  });
});
