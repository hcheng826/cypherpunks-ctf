# Cypherpunks-ctf

Cypherpunks-ctf is like [The Ethernaut](https://ethernaut.openzeppelin.com/) from OpenZeppelin, or the [Capture The Ether](https://capturetheether.com/) challenge. It is a challenge that help player learn the knowledge of smart contract security. The challenge consists of a series of levels about smart contract vulnerabilities. In each level there is a contract with security issue. And player need to find it, try to exploit the contract and pass that level.

I have completed the challenge and this repo consist of all the solutions for the challenge. The techniques used has a wide range: variable underflow, reentrancy attack, get private variable value by reading storage on chain or read state change on block explorer, the risk of delegatecall changing unexpected variables, bypass `extcodesize` check for whether caller is a contract, bypecode manipulation, etc. Some of the vunlerabilities are covered in higher versions of Solidity (compiling errors or warnings), but developers should definitely still bear in mind and avoid such dangerous patterns.

Cypherpunks-ctf website:
https://cypherpunks-core.github.io/cypherpunks-ctf/

## Solutions

1. Bank

The vunlerablility exists in the deduction operation of the balance. User can underflow the value by (29 - 30 = 2\*\*256-1) and get a huge number of as the balance value.

2. Encrypt

Knowing that XOR of 2 same value is 0. Just need to input 0.

3. FreeShop

The possibility of attack is that the contract sent the ether before deducting the variable value of the contract. Prepare an attacking contract and setting up a fallback function to make a reentrancy attack. Before the state is change, call the withdraw function recursively and the contract would be drained.

4. University

To complete this quest player need to read the value of the private variable. Turns out private variable is not actually that "private" becuase the state change is on chain after all. Player need to understand the storage slot for the contract. Then read the state change on the deployment transaction(from Etherscan). And find the content in the private array name[2].

5. Fake Fibonacci

Need to play extra attention when using `delegateCall`. `delegateCall` is differet from normal function call that it's calling in the caller contract's context. Can be imagined like it take the code from the called contract and "inject" into the calling contract. So all the storage variable changes happens at the calling contract. And more importantly, the variables does not use the variable name as reference, but the storage slot in contract. So in this task player can use delegateCall to change the calling contract's content. Change the lib address to the attacking contract.

6. PaperScissorsStone

The goal is to hack the random mechanism. While a hash on the current block number looks random, it can be exploited by creating an attacking contract to compute the current bloch hash and call the `guess` method with the answer. The block number of the attacking contract and paper scissors stone contract is the same so the answer is always correct.

7. Fomo4D

The goal is to bypass the check of whether the caller is a contract. `extcodesize` is used to check the code size of an address to check if it's a contract address. EOA code size should be 0. But calling in contructor can bypass this check, since in the contructing process the code size is 0. A safer way is to check `tx.origin` instead.

8. MroganStark

We want to forcely send ether to a contract without a `payable` function. `selfdestruct` can do that. Deploy a contract with the `selfdestruct` method, send some ether there, and call the method could forcely send the ether.

9. Venture Capital

The exploition is based on 2 points - 1) Before a contract is deployed, we can pre-compute the contract address and send ether to the address. 2) With missing variable declaration, storage variable could be changed unexpectedly. We can bypass the check for `isManager` by sending the ether to the pre-computed address and turn on developer auth mode. Then observe that newClient function could be utilized to change the contract `owner` by setting the age to the decimal format of player address. Finally try to pass all the `require`s in the `close()` method.

10. Strong Box

This level takes the technique to revesing engineer. Deploy the contract and decompile it from the bytecode. Try to understand the assembly-like code and turn the complete variable to true.

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
