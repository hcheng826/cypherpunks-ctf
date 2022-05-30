const { ethers } = require("hardhat");

function attackWings() {
    while(true) {
        const newWallet = ethers.Wallet.createRandom();
        if (newWallet.address.match('42b100d')) {
            console.log('address: ', newWallet.address);
            console.log('pk: ', newWallet.privateKey);
            break;
        }
    }
}

async function attackTail() {
    const txHash1 = '0x7fcce11dd45573eb5a213ec4658dcdaa7dbb67396fa95f882928bcb5cd48531b';
    const tx1 = await ethers.provider.getTransaction(txHash1);
    console.log('tx1:', tx1);

    const txData = {
        gasPrice: tx1.gasPrice,
        gasLimit: tx1.gasLimit,
        value: tx1.value,
        nonce: tx1.nonce,
        data: tx1.data,
        to: tx1.to,
        chainId: tx1.chainId,
    };
    const signingData = ethers.utils.serializeTransaction(txData);
    const msgHash = ethers.utils.keccak256(signingData);

    const signature = { r: tx1.r, s: tx1.s, v: tx1.v };
    let rawPublicKey = ethers.utils.recoverPublicKey(msgHash, signature);
    rawPublicKey = `0x${rawPublicKey.slice(4)}`;
    console.log('rawPublicKey:', rawPublicKey);
}

async function attackHead() {
    const txHash1 = '0x488218f097c6ddc87571cfd98dcd3b9021624f9486277d2393af44aa101a93b6';
    const txHash2 = '0xa2b5b2e2af95ec5ac6add6dd6757ae9eb1ba7918a71e0e8b797036fad8dbdcc6';
}
