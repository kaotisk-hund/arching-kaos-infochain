#!/bin/bash
TX_FILE="txs_parsed"
wget -q https://api.stellar.expert/explorer/public/payments\?asset\=ARCHINGKAOS-GB4QVKD6NW3CSNO5TNPARAWNPPXOPSSTKB35XCWB7PUNBIQTK3DVELB2\&order\=asc\&limit\=2000 -O - | json_pp|grep -e '"memo"' | awk '{print $3}' | sed -e 's/"//g' | sed -e 's/,//g' > $TX_FILE
