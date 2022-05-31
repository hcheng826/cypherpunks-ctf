# ref: https://bitcoin.stackexchange.com/questions/35848/recovering-private-key-when-someone-uses-the-same-k-twice-in-ecdsa-signatures

r = 0xd1af03d2c4e4f26a4f764f43a76e54c31a2db5b9518de7bc81ea237b3b229ba2
s1 = 0x739806164a2d2003bcd474bff0bd5505ff2279c5cfea73e380164b21a4bbec52
s2 = 0x7480b1ac401a7c4d035e47bb8599810c338c19faa3e5e381931204a64775c96e
# For Ethereum msg hash, feel free to use this excellent online toolkit: https://toolkit.abdk.consulting/ethereum#recover-address
z1 = 0x68f0040cffd86dfabf5ba8274ae3f8cdcfddcb4e1b1962b097c94177a7997157
z2 = 0x7e901b0343d04fbb1bb1e10d37fd073ffeb30d31cc1ae5678fe392437681b4a5

# This function is from
# https://github.com/tlsfuzzer/python-ecdsa/blob/master/src/ecdsa/numbertheory.py
def inverse_mod(a, m):
    """Inverse of a mod m."""
    if a == 0:  # pragma: no branch
        return 0
    return pow(a, -1, m)

# Magic: https://en.bitcoin.it/wiki/Secp256k1
p = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141

for (i, j) in [(1,1),(1,-1),(-1,1),(-1,-1)]:
    z = z1 - z2
    s = s1*i + s2*j
    r_inv = inverse_mod(r, p)
    s_inv = inverse_mod(s, p)
    k = (z * s_inv) % p
    d = (r_inv * (s1 * k - z1)) % p
    print(f"Private key: {hex(d)}, {hex(k)}")
