# Encoding
def encode(m):
    return m[15:31]+"."+m[:15],"."+m[:15]+m[15:31],m[15:31]+m[31:]+".","."+m[:15]+m[31:]+"." 
# Decoding
def decode(tx):
    ones = []
    twos = []
    tres = []
    fors = []
    vals = []
    resu = []
    for x in tx:
        if x.startswith("."): # 12 or 13
            if x.endswith("."): # 13
                fors.append(x)
            else:
                twos.append(x)
        else: 
            if x.endswith("."):
                tres.append(x)
            else:
                ones.append(x)
    for on in ones:
        for tw in twos:
            if on[:16] == tw[16:] or on[16:] == tw[:16]:
                for tr in tres:
                    if tr[:16] == tw[16:]:
                        print("found")
                        for fo in fors:
                            if on[16:] == fo[:16]:
                                print("validated")
                                vals.append(on[16:]+tw[16:]+tr[16:])

    for v in vals:
        if v.startswith(".") and v.endswith("."):
            resu.append(v[1:47])
    return resu

def test():
    orig = "QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH"
    pr = encode(orig)
    print(pr)
    e = decode(pr)
    sl = e[0][1:47]
    print(sl)
    print(orig)
    if orig == sl:
        print("test pasted")
    else:
        print("failed")
