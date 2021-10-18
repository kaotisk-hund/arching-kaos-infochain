#!/bin/bash
# The following creates a mixtape data message
# We can extend it by calling the pack_z_block.sh action data

FINGERPRINT="$(gpg2 --list-keys | grep kaos@kaos.kaos -1 | head -n1 | awk '{print $1}')"

usage(){
    echo "$0 - data_file [optional arguments separated with spaces]"
    echo ""
    echo "data_file      The file attached to the metadata following"
    echo "optional       These arguments are not specified, they can be"
    echo "               anything that we want to upload as metadata"
}

main(){
    echo $DATA_FILE

    DATA_IPFS_HASH=$(ipfs add -q $DATA_FILE)

    DATA_SIGN_FILE=$DATA_FILE".asc"
    gpg2 --detach-sign --sign-with $FINGERPRINT --armor --output $DATA_SIGN_FILE $DATA_FILE

    DATA_SIGNATURE=$(ipfs add -q $DATA_SIGN_FILE)

    cat > data <<EOF
{
    "ipfs":"$DATA_IPFS_HASH",
    "detach":"$DATA_SIGNATURE"
}
EOF

}

title(){
    echo "AK data creator"
    echo "==============="
}

title

if [ ! -z $2 ];
then
    PWD="$(pwd)"
    DATA_FILE="$PWD/$1"
    if [ -f "$DATA_FILE" ]; then
        main
    else
        echo "File does not exist"
    fi

    cat $PWD/data | json_pp
    # sh pack_z_block.sh data/add $PWD/data
else
    usage
fi
