pragma solidity ^0.4.24;

contract Test1 {
    Test2 public test2;
    address public test2Addr;
    constructor () {
        test2 = new Test2();
        test2Addr = address(test2);
        test2.setAddr();
    }
}

contract Test2 {
    address public testAddr;

    function setAddr() public {
        testAddr = msg.sender;
    }
}
