const { ethers } = require("hardhat");
const hre = require('hardhat');

describe("Strong Box", function () {
  it("test", async function () {
    const provider = ethers.provider;
    const [deployer, player] = await hre.ethers.getSigners();

    const guardFactory = await ethers.getContractFactory("Guard");
    const guard = await guardFactory.connect(deployer).deploy();
    await guard.deployed();

    const sbFactory = await ethers.getContractFactory("StrongBox");
    let sb = await sbFactory.connect(deployer).deploy(guard.address);
    await sb.deployed();

    sb = sb.connect(player);

    console.log('sb address:', sb.address);
    console.log('guard address:', await sb.guardLib());

    console.log('gurad bytecode: ', await provider.getCode(await sb.guardLib()));

    const methodData = '0xF00B8676';
    const argData = ethers.utils.keccak256(player.address).slice(2, 58) + '30303030';
    console.log('argData:', argData);
    console.log(player.address);

    await player.sendTransaction({
        from: player.address,
        to: guard.address,
        data: methodData + argData,
        gasLimit: 200000,
        value: '0x5E335D9ECCD2001'
    });

    // await guard.connect(player).crack('0x' + argData, { value: '0x5E335D9ECCD2001' });

    console.log('pass:', await sb.pass());
  });
});
