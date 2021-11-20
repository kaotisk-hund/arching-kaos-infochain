#!/bin/bash
if [ ! -z $1 ]
then
	echo "Creating new Genesis block with phrase: $1"
	PHRASE=$1
	touch $PHRASE
	echo "$PHRASE" > $PHRASE
	echo "Printing contents of file:"
	cat $PHRASE
	GENESIS=$(ipfs add -q $PHRASE)
	echo $GENESIS
	echo "Printing IPFS CID contents:"
	ipfs cat $GENESIS
	while true; do
		read -p "Do you want to post this information to the chain (y/n)?" yn
		case $yn in
			[Yy]* ) python send_as_kh_tx.py $GENESIS; break;;
			[Nn]* ) exit;;
			* ) echo "Please answer y for yes or n for no.";;
		esac
	done
else
	echo $1
fi

