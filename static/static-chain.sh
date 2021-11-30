#!/bin/bash
ipfs name publish --key=chain-js /ipfs/$(ipfs add -q chain-explorer.js)
ipfs name publish --key=chain-html /ipfs/$(ipfs add -q chain-explorer.html)
firefox --private-window https://ipfs.arching-kaos.com/ipns/k51qzi5uqu5dhqd0ry3xpxkv2fy9t5v9gbcrrg1oioboui6s2hdz2wwysgw3lb
