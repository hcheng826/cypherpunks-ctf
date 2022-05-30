const ethers = require('ethers');

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

attackWings();
