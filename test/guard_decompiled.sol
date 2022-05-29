// from: https://www.trustlook.com/services/smart.html

contract disassembler {

    uint8 public complete;

    function FUNC_774C0207( uint256 arg0) public return ()
    {
        require((0x31647A3B26AC000 < msg.value));
        var3 = (0x53CEC83 > arg0);
        if ((arg0 > 0x53CEC83))
        {
            if (var3)
            {
label_00000157:
                var7 = uint160(msg.sender).call.gas(((0x18 == 0) * 0x8FC)).value(0x18)(0x80,0x0);
                if (var7)
                {
label_0000019F:
                    return();
                }
                else
                {
                    returndatacopy(0x0,0x0,returndatasize);
                    revert(0x0,returndatasize);
                }
            }
            else
            {
                return();
            }
        }
        else if ((arg0 < 0x4B23526))
        {
            goto label_0000019F;
        }
        else
        {
            goto label_00000157;
        }
    }

    function FUNC_F00B8676( uint256 arg0) public return ()
    {
        var2 = arg0;
        var5 = 0x0;
        var6 = 0x0;
        require((0x5E335D9ECCD2000 < msg.value));
        var3 = 0x1C; // 28
label_000001C7:
        if ((0x20 < var3)) // 32 1st loop
        {
            var3 = 0x1C; // 28
label_0000025E:
            if ((0x20 < var3)) // 2nd loop
            {
                var3 = 0x1C;
label_000002D1:
                if ((0x20 < var3)) // 3rd loop
                {
                    mstore(0xA0,(0x1000000000000000000000000 * uint160(uint160(msg.sender))));
                    mstore(0x80,0x14); // 20
                    mstore(0x40,0xB4); // 180
                    var11 = 0xB4; // 180
                    temp0 = mload(0x80); // 20
                    var13 = temp0; // 20
                    var14 = temp0; // 20
                    var15 = 0xB4;
                    var16 = 0xA0;
label_000003B6:
                    if ((var14 < 0x20)) // 4th loop
                    {
                        temp1 = mload(var16);
                        temp2 = mload(var15);
                        mstore(var15,((temp1 & ~(EXP(0x100,(0x20 - var14)) - 0x1)) | (temp2 & (EXP(0x100,(0x20 - var14)) - 0x1))));
                        temp3 = (var13 + var11);
                        temp4 = keccak256(0xB4,(temp3 - 0xB4));
                        var8 = temp4;
                        var3 = 0x0;
label_0000040F:
                        if ((0x1C < var3))
                        {
                            if ((var5 == var6))
                            {
                                complete = 0x1;
                                return();
                            }
                            else
                            {
                                return();
                            }
                        }
                        else
                        {
                            var9 = var8;
                            var10 = var3;
                            assert((var3 < 0x20));
                            var9 = (~0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF & (0x100000000000000000000000000000000000000000000000000000000000000 * BYTE(var10,var9)));
                            var10 = var2;
                            var11 = var3;
                            assert((var3 < 0x20));
                            temp5 = (~0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF & (0x100000000000000000000000000000000000000000000000000000000000000 * BYTE(var11,var10)));
                            require((temp5 == var9));
                            var3 = (0x1 + var3);
                            goto label_0000040F;
                        }
                    }
                    else
                    {
                        temp6 = mload(var16); // (0x1000000000000000000000000 * uint160(uint160(msg.sender)))
                        mstore(var15,temp6);
                        var15 = (var15 + 0x20); // 0xD4
                        var16 = (var16 + 0x20); // 0xC0
                        var14 = (var14 - 0x20); // 0
                        goto label_000003B6;
                    }
                }
                else
                {
                    var10 = var2;
                    var11 = var3;
                    assert((var3 < 0x20));
                    temp7 = (0x100000000000000000000000000000000000000000000000000000000000000 * BYTE(var11,var10)); // arg[i]
                    var6 = (var6 + EXP(((temp7 / 0x100000000000000000000000000000000000000000000000000000000000000) - 0x30),0x4)); // (arg[i] - 48) ** 4 (needs to be 0)
                    var3 = (0x1 + var3);
                    goto label_000002D1;
                }
            }
            else
            {
                var10 = var2;
                var11 = var3;
                assert((var3 < 0x20));
                var3 = (0x1 + var3); // keep increment until var3 > 32, do nothing
                goto label_0000025E;
            }
        }
        else
        {
            var10 = var2;
            var11 = var3;
            assert((var3 < 0x20));
            temp9 = (0x100000000000000000000000000000000000000000000000000000000000000 * BYTE(var11,var10));
            var4 = ((temp9 / 0x100000000000000000000000000000000000000000000000000000000000000) - 0x30); // arg[i] - 48
            var9 = (0xA > uint8(((temp9 / 0x100000000000000000000000000000000000000000000000000000000000000) - 0x30))); // 10 > (arg[i] - 48)
            if ((uint8(((temp9 / 0x100000000000000000000000000000000000000000000000000000000000000) - 0x30)) > 0xA)) // (arg[i] - 48) > 10
            {
                if (var9)
                {
label_0000024C:
                    var3 = (0x1 + var3);
                    goto label_000001C7;
                }
                else
                {
label_00000248:
                    revert(0x0,0x0);
                }
            }
            else if ((0x0 < uint8(var4))) // arg[i] - 48 > 0
            {
                goto label_0000024C;
            }
            else
            {
                goto label_00000248;
            }
        }
    }

    function FUNC_FF4AB96B( uint256 arg0) public return ()
    {
        require((0x35D4357F5078000 < msg.value));
        if ((uint160(arg0) == uint160(msg.sender)))
        {
            var7 = uint160(arg0).call.gas(((0x2A == 0) * 0x8FC)).value(0x2A)(0x80,0x0);
            if (var7)
            {
                return();
            }
            else
            {
                returndatacopy(0x0,0x0,returndatasize);
                revert(0x0,returndatasize);
            }
        }
        else
        {
            return();
        }
    }

    function main() public return ()
    {
        mstore(0x40,0x80);
        if ((msg.data.length < 0x4))
        {
label_00000062:
            revert(0x0,0x0);
        }
        else
        {
            var0 = uint32((msg.data(0x0) / 0x100000000000000000000000000000000000000000000000000000000));

            //ISSUE:COMMENT: Function complete()
            if ((0x522E1177 == uint32((msg.data(0x0) / 0x100000000000000000000000000000000000000000000000000000000))))
            {
                require(!msg.value);
                var2 = complete();
                mstore(0x80,var2);
                RETURN(0x80,0x20);
            }

            //ISSUE:COMMENT: Function FUNC_774C0207()
            else if ((0x774C0207 == var0))
            {
                FUNC_774C0207(msg.data(0x4));
                stop();
            }

            //ISSUE:COMMENT: Function FUNC_F00B8676()
            else if ((0xF00B8676 == var0))
            {
                FUNC_F00B8676((~0x0 & msg.data(0x4)));
                stop();
            }

            //ISSUE:COMMENT: Function FUNC_FF4AB96B()
            else if ((0xFF4AB96B == var0))
            {
                FUNC_FF4AB96B(uint160(msg.data(0x4)));
                stop();
            }
            else
            {
                goto label_00000062;
            }
        }
    }

}
