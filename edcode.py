# Encoding
def encode(m):
    return "..."+m[:11]+".."+m[11:23], "..."+m[:11]+m[23:35]+"..", "..."+m[:11]+m[35:]+"...", ".."+m[11:23]+m[23:35]+"..", ".."+m[11:23]+m[35:]+"..."

# Decoding
def decode(tx):
    ones = []
    twos = []
    tres = []
    fors = []
    fivs = []
    vals = []
    resu = []
    for x in tx:
        if x.startswith("..."): # AB or AC or AD
            if x.endswith(".."): # AC or AD
                if x.endswith("..."): # AD
                    tres.append(x)
                else: # AC
                    twos.append(x)
            else: # AB
                ones.append(x)
        else: # BC or BD
            if x.endswith("..."): # BD
                fivs.append(x)
            else: # BC
                fors.append(x)
    for on in ones:
        for tw in twos:
            for tr in tres:
                if on[:14] == tw[:14] and on[:14] == tr[:14]:
                    # print("found")
                    for fo in fors:
                        for fi in fivs:
                            if on[14:] == fo[:14] and on[14:] == fi[:14]:
                                # print("validated")
                                vals.append(on[:14]+fo+fi[14:])

    for v in vals:
        resu.append(v.replace(".",""))
    return resu

def test():
    orig = "QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH"
    pr = encode(orig)
    print(pr)
    e = decode(pr)
    sl = e[0]
    print(sl)
    print(orig)
    if orig == sl:
        print("test pasted")
    else:
        print("failed")
