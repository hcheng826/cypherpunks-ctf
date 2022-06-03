a[0] = 0x6300; // 0x63	PUSH4	Place 4-byte item on stack // 0x00	STOP	Halts execution
a[1] = blockNumber;
a[2] = 0x43; // NUMBER	Get the block's number
a[3] = 0x10; // Less-than comparison
a[4] = 0x58; // GETPC	Get the value of the program counter prior to the increment
a[5] = 0x57; // JUMPI	Conditionally alter the program counter
a[6] = 0x33; // Get caller address
a[7] = 0xff; // selfdestruct
