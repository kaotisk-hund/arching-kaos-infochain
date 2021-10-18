#!/usr/bin/python3
# We need a script to download all the data -no verification prewrite-
# 
# Things are quite simple, we load the HASH of ZBLOCK, then we extract the BLOCK
# and download its components {ACTION, DATA, DETACH, KEY}
# 
# Of course somewhere in the procedure, we SHOULD check the signatures
#
import json
import gnupg
import requests
import fs
import os

ipfs_gateway="http://127.0.0.1:8080/ipfs/"
#gpg=gnupg.GPG(gnupghome="/home/kaotisk/.gnupg/")
def download_zblock(ZBLOCK_HASH):
    temp=requests.get(ipfs_gateway+ZBLOCK_HASH)
    open(ZBLOCK_HASH, 'wb').write(temp.content)
    extract_zblock()

def download_block(block, block_signature):
    temp=requests.get(ipfs_gateway+block)
    open(block, 'wb').write(temp.content)
    temp=requests.get(ipfs_gateway+block_signature)
    open(block_signature, 'wb').write(temp.content)
    temp=0
    extract_block(block)

def extract_zblock(ZBLOCK_HASH):
    hash = "zblock"
    hash=ZBLOCK_HASH
    with open(hash) as json_file:
        data=json.load(json_file)
        block=data['block']
        block_signature=data['block_signature']
        download_block(block,block_signature)


#def other():
#    lemq=open(os.path.abspath(".")+"/"+block, "r") 
#    leme=open(os.path.abspath(".")+"/"+block_signature, "r") 
#    fif=gpg.verify_file(lemq)
#    print("Verified ZBLOCK pair! ", fif.trust_text)

def extract_block(block):
    with open(block) as json_file:
        block_data=json.load(json_file)
        action=block_data['action']
        print(action+" called")
        data=block_data['data']
        print("for data file: "+data)
        temp=requests.get(ipfs_gateway+data)
        open(data, 'wb').write(temp.content)
        detach=block_data['detach']
        print("signature: "+detach)
        temp=requests.get(ipfs_gateway+detach)
        open(detach, 'wb').write(temp.content)
        key=block_data['gpg']
        print("gpg: "+key)
        open(key, 'wb').write(temp.content)

# Example usage:
# extract_zblock("QmTkWkLkxaF1bwZVEBPB12j4hz9bfD52WGZZLvZaNj9MyD")
