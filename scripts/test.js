const ethers = require('ethers');

const outbidIncrement = 1;

console.log(ethers.BigNumber.from('0x746a55954').add(
    ethers.utils.parseUnits(outbidIncrement.toString(), 'gwei')
));
