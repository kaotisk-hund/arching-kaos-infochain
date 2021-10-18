#!/usr/bin/python3
# The following provides as with the last message ever posted
# It needs to have a file called txs_parsed in order to work
# This should be a subject to chain.
# In fact, the script is a duplicate of the `tx_decoder.py` but
# it got renamed in order to supply only that information.
from edcode import decode

def getLast(v):
    l=len(v)-1
    return v[l]
    
tx = open("txs_parsed", "r") # Always perform a `dltx.sh` to have fresh contents
count = 0
txs=[]
for line in tx:
    count += 1
    # print("{}: {}".format(count, line.strip()))
    txs.append(line.strip())

tx.close()
ok=decode(txs)

print(getLast(ok))
