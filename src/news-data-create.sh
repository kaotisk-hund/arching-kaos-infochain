#!/bin/bash
# The following creates a mixtape data message
# We can extend it by calling the pack_z_block.sh mixtape/add data

FINGERPRINT="$(gpg2 --list-keys | grep kaos@kaos.kaos -1 | head -n1 | awk '{print $1}')"

usage(){
	echo "$0 - file"
}

main(){
	if [ -f $FILE ]
	then
		echo "Adding news from " $FILE

		FILE_IPFS_HASH=$(ipfs add -q $FILE)

		FILE_SIGN_FILE=$FILE".asc"
		gpg2 --detach-sign --sign-with $FINGERPRINT --armor --output $FILE_SIGN_FILE $FILE

		FILE_SIGNATURE=$(ipfs add -q $FILE_SIGN_FILE)

		cat > data <<EOF
{
    "ipfs":"$FILE_IPFS_HASH",
    "detach":"$FILE_SIGNATURE"
}
EOF
	else echo "File $FILE doesn't exist";
	fi

}

title(){
	echo "AK  block creator"
	echo "========================"
}

title

if [ ! -z $1 ];
	then
	PWD="$(pwd)"
	FILE="$1"
	main
	cat $PWD/data | json_pp
	# sh pack_z_block.sh mixtape/add $PWD/data
	while true; do
		read -p "Do you is the information above correct (y/n)?" yn
		case $yn in
			[Yy]* ) sh pack_z_block.sh "news/add" data; break;;
			[Nn]* ) exit;;
			* ) echo "Please answer yes or no.";;
		esac
	done
else usage
fi
