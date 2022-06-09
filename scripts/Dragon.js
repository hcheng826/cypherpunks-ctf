const { ethers } = require("hardhat");

function attackWings() {
    /* run this to search for the fuzzy match account
    while(true) {
        const newWallet = ethers.Wallet.createRandom();
        if (newWallet.address.match('42b100d')) {
            console.log('address: ', newWallet.address);
            console.log('pk: ', newWallet.privateKey);
            break;
        }
    }
    */


    const wallet = new ethers.Wallet(
        "0x04431d256ee73593744ac46bdc57338e82d56bb59cd8825567ad7e906a3b89b2"
    );
    const dragon = await ethers.getContractAt(
        require("../artifacts/contracts/Dragon.sol/Dragon.json").abi,
        "0x6d61ca77f76c242ab328d8de3eb417cc501f1270",
        wallet.connect(ethers.provider)
    );
    const attackWingsTx = await dragon.attackWings(wallet.address, {
        gasLimit: 2e6,
    });
    await attackWingsTx.wait();
}

async function attackTail() {
    const txHash1 = '0x7fcce11dd45573eb5a213ec4658dcdaa7dbb67396fa95f882928bcb5cd48531b';
    const tx1 = await ethers.provider.getTransaction(txHash1);
    console.log('tx1:', tx1);

    const msgHash = getMsgHash(tx1);

    const signature = { r: tx1.r, s: tx1.s, v: tx1.v };
    let rawPublicKey = ethers.utils.recoverPublicKey(msgHash, signature);
    rawPublicKey = `0x${rawPublicKey.slice(4)}`;
    console.log('rawPublicKey:', rawPublicKey);
}

// owner address: 0x2C9C4ca7a2fAFf6e1370084985FBE71D3D452A19
async function attackHead() {
    const txHash1 = '0x488218f097c6ddc87571cfd98dcd3b9021624f9486277d2393af44aa101a93b6';
    const txHash2 = '0xa2b5b2e2af95ec5ac6add6dd6757ae9eb1ba7918a71e0e8b797036fad8dbdcc6';

    const tx1 = await ethers.provider.getTransaction(txHash1);
    const tx2 = await ethers.provider.getTransaction(txHash2);

    console.log(tx1.r);
    console.log(tx2.r);

    const msgHash1 = getMsgHash(tx1);
    const msgHash2 = getMsgHash(tx2);
    console.log(tx1.s);
    console.log(tx2.s);
    console.log(msgHash1);
    console.log(msgHash2);

    // get private key from the python code
    const privateKey = '0xf062c7438733d9616b85bd6d7ef4dd0f06cabcd772dae19f09c1b3e9768fa666';
    const wallet = new ethers.Wallet(privateKey);
    const dragon = await ethers.getContractAt(
        require('../artifacts/contracts/Dragon.sol/Dragon.json').abi,
        '0x6d61ca77f76c242ab328d8de3eb417cc501f1270',
        wallet.connect(ethers.provider)
    );
    const attackHeadTx = await dragon.attackHead();
    await attackHeadTx.wait();
}

function getMsgHash(tx) {
    const txData = {
        gasPrice: tx.gasPrice,
        gasLimit: tx.gasLimit,
        value: tx.value,
        nonce: tx.nonce,
        data: tx.data,
        to: tx.to,
        chainId: tx.chainId,
    };
    const signingData = ethers.utils.serializeTransaction(txData);
    const msgHash = ethers.utils.keccak256(signingData);
    return msgHash;
}

function verifyPrivateKey(k) {
    const wallet = new ethers.Wallet(k);
    return wallet.address === '0x2C9C4ca7a2fAFf6e1370084985FBE71D3D452A19';
}

// console.log(verifyPrivateKey('0xf062c7438733d9616b85bd6d7ef4dd0f06cabcd772dae19f09c1b3e9768fa666'));
// attackHead();
