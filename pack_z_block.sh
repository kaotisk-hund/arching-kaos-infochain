#!/bin/bash
# This file describe the structure of the ArchingKaos messages.
#
# As previously thought, we exchange one IPFS hash through whatever means we can.
# 
# GPG is mentioned as a signing algorithm for encryption, decryption and signing.
# Let's say we have a file named as `example`
#FINGERPRINT="CHANGE THIS TO YOUR DEFAULT FINGERPRINT"
FINGERPRINT="$(gpg2 --list-keys |grep kaos@kaos.kaos -1 | head -n1 | awk '{print $1}')"
usage(){
	echo "$0 - action file"
	echo "Findout"
}
main(){
#	echo "Hello world!" > example # Instead this should be a file read from the command execution
# and instead by like the following
#ACTION="$2"  ## In case of program_name action data
#MESSAGE="$1" 
echo $ACTION $MESSAGE
# We add it to IPFS
	MESSAGE_HASH=$(ipfs add -q $MESSAGE)

# We create a detached and armor signature of it
	MESSAGE_SIGN_FILE=$MESSAGE".asc"
	gpg2 --detach-sign --sign-with $FINGERPRINT --armor --output $MESSAGE_SIGN_FILE $MESSAGE

# We add the signature to IPFS
	MESSAGE_SIGNATURE=$(ipfs add -q $MESSAGE_SIGN_FILE)

# We will be using our public key also to put it in the block later
	KEY="gpg.pub"
	gpg2 --armour --output $KEY --export $FINGERPRINT
	GPG_PUB_KEY=$(ipfs add -q $KEY)

# We create a block of json like this:
	cat > block <<EOF
{
	"action":"$ACTION",
	"data":"$MESSAGE_HASH",
	"detach":"$MESSAGE_SIGNATURE",
	"gpg":"$GPG_PUB_KEY"
}
EOF
	BLOCK="block"
	BLOCK_SIG=$BLOCK".asc"
# We have a block now, so we sign it
	gpg2 --detach-sign --sign-with $FINGERPRINT --armor --output $BLOCK_SIG $BLOCK

# We now add the signature to IPFS
	BLOCK_SIGNATURE=$(ipfs add -q $BLOCK_SIG)

# We also add the block!
	BLOCK=$(ipfs add -q $BLOCK)

# So we now do the think almost again
	cat > zblock << EOF
{
	"block":"$BLOCK",
	"block_signature":"$BLOCK_SIGNATURE"
}
EOF
	ZBL="zblock"
# and we add it on IPFS
	ZBLOCK=$(ipfs add -q $ZBL)
	echo $ZBLOCK
}
title(){
	echo "AK block creator from ACTION and FILE"
	echo "====================================="
}
title
if [ ! -z $2 ];
then
	PWD="$(pwd)"
	MESSAGE="$PWD/$2"
	ACTION="$1"
	main
else usage
fi


