#!/usr/bin/python3
import os
from edcode import decode
import zExtractor
from flask import Flask,render_template
app = Flask(__name__)

# Re-enable when is good for release
os.system("sh download-transactions-to-file.sh")

# Get last post just if it comes handy
# Replaced with `get_last.py`
def getLast(v):
    l=len(v)-1
    return v[l]
    
# Opening transactions file
tx = open("txs_parsed", "r")
count = 0
txs=[]
for line in tx:
    count += 1
    # print("{}: {}".format(count, line.strip()))
    txs.append(line.strip())

tx.close()

# Find CIDs
ok=decode(txs)

#print(ok[0])
# zblock=ok[0]


def hi():
    r=[]
    for o in ok:
        # zExtractor.download_zblock(o)
        r.append(zExtractor.download_zblock(o))
    # print(r)
    return r

@app.route('/')
def index():
    return render_template('index.html', header='Arching Kaos', sub_header='heading towards', list_header="Results", results=hi(), site_title="Arching Kaos")

if __name__ == '__main__':
    app.run(debug=True)
