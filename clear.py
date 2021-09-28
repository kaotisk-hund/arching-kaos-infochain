# Encoding
def encode(m):
    return m[15:31]+"."+m[:15],"."+m[:15]+m[15:31],m[15:31]+m[31:]+".","."+m[:15]+m[31:]+"." 


def decode(tx):
    print(type(tx))
    ones = []
    twos = []
    tres = []
    fors = []
    vals = []
    for x in tx:
        print(x)
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
    print("ok")
    for on in ones:
        print(on)
        for tw in twos:
            print(tw)
            if on[:16] == tw[16:] or on[16:] == tw[:16]:
                for tr in tres:
                    if tr[:16] == tw[16:]:
                        print("found")
                        for fo in fors:
                            if on[16:] == fo[:16]:
                                print("validated")
                                vals.append(on[16:]+tw[16:]+tr[16:])
    return vals

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
