def addDots(message):
    form="."+message+"."
    return form

def removeDots(message):
    return message[1:47]

def chunk(l):
    #a = l[:16]
    #b = l[16:32]
    #c = l[32:]
    createTransactionMemo(l[:16],l[16:32],l[32:])

def createTransactionMemo(a,b,c):
    q = b+a
    w = a+b
    e = b+c
    r = a+c
    packet = [q,w,e,r]
    return packet

def getTxOrder(x):
    if x.startswith("."): # 12 or 13
        if x.endswith("."): # 13
            return "4"
        else:
            return "2"
    else: 
        if x.endswith("."):
            return "3"
        else:
            return "1"

def packageSorting(*tx):
    print(len(tx))
    ones = []
    twos = []
    tres = []
    fors = []
    for x in tx:
        if getTxOrder(x) == "1":
            ones.append(x)
        if getTxOrder(x) == "2":
            twos.append(x)
        if getTxOrder(x)== "3":
            tres.append(x)
        if getTxOrder(x) == "4":
            fors.append(x)
    findAndValidate(ones,twos,tres,fors);

def findAndValidate(ones,twos,tres,fors):
    for on in ones:
        for tw in twos:
            if on[:16] == tw[16:]:
                for tr in tres:
                    if tr[:16] == tw[16:]:
                        print("found")
                        for fo in fors:
                            if on[16:] == fo[:16]:
                                print("validated")
                                return on[16:]+tw[16:]+tr[16:]
def send(message):
    m = addDots(message)
    print(m)
    return chunk(m)
def test():
    packageSorting(send("QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH"))


