# Cypherpunks-ctf

https://cypherpunks-core.github.io/cypherpunks-ctf/

Cypherpunks-ctf is a series of challanges about smart contract vulnerabilities. In each challenge there is a contract with security issue. And player need to find it and try to exploit the contract.

## Solutions

1. Bank

Underflow the balance (29 - 30 = 2\*\*256-1).

2. Encrypt

XOR 2 same things is 0.

3. FreeShop

Use fallback function to make a reentrancy attack. Before the state is change, call the withdraw function recursively.

4. University

Need to calculate the storage slot for the contract. Then read the state change on the deployment transaction. And find the content in the private array name[2].

5. Fake Fibonacci

Use delegateCall to change the calling contract's content. Change the lib address to the attacking contract.

6. PaperScissorsStone

Creating an attacking contract to compute the current bloch hash and call the `guess` method with the answer. The block number of the attacking contract and paper scissors stone contract is the same so the answer is always correct.

7. Fomo4D

`extcodesize` is used to check the code size of an address to check if it's a contract address. EOA code size should be 0. But calling in contructor can bypass this check, since in the contructing process the code size is 0.

8. MroganStark

use `selfdestruct`

9. Venture Capital

Can bypass the check for `isManager` by sending the ether to the pre-computed address and turn on developer auth mode. Then observe that newClient function could be utilized to change the contract `owner` by setting the age to the decimal format of player address. Finally try to pass all the `require`s in the `close()` method.

10. Strong Box

Deploy the contract and decompile it from the bytecode. Try to understand the assembly-like code and turn the complete variable to true.

11. Dragon

attackWings: random generate wallet with private key and try to match the address with `'42b100d'`.
attackTail: to pass `keccak256(_secrect)) == dragonDen`. `_secret` should be the public key of `dragonDen` wallet.
attackHead: to get the private key of the address `owner`. Observe that the address sent 2 transactions with same `'k'` value. Use the ECDSA to recover the
(reference: https://bitcoin.stackexchange.com/questions/35848/recovering-private-key-when-someone-uses-the-same-k-twice-in-ecdsa-signatures)

12. Crosslink Ship

If a normal block number (> block.time + 50000) is passed in to `dropShipAnchor`, the decompiled contract looks like this: https://ropsten.etherscan.io/bytecode-decompiler?a=0xe7a3ab3373affaaabf0e3212b713aea584adae1e

```
def _fallback() payable: # default function
  require block.number >= 12370017
  selfdestruct(caller)
```

The idea is to pass a block number that is > block.time + 50000, and can change the opcode and bypass the the `require` check. Pass in `1667457891` (`0x63636363` in opcode it's multiple pushes).
