#!/bin/bash
# The following creates a mixtape data message
# We can extend it by calling the pack_z_block.sh mixtape/add data

FINGERPRINT="$(gpg2 --list-keys | grep kaos@kaos.kaos -1 | head -n1 | awk '{print $1}')"

usage(){
    echo "$0 - artist title file"
}

main(){
    echo $MIXTAPE_FILE "by" $MIXTAPE_ARTIST "named as" $MIXTAPE_TITLE

    MIXTAPE_IPFS_HASH=$(ipfs add -q $MIXTAPE_FILE)

    MIXTAPE_SIGN_FILE=$MIXTAPE_FILE".asc"
    gpg2 --detach-sign --sign-with $FINGERPRINT --armor --output $MIXTAPE_SIGN_FILE $MIXTAPE_FILE

    MIXTAPE_SIGNATURE=$(ipfs add -q $MIXTAPE_SIGN_FILE)

    cat > data <<EOF
{
    "artist":"$MIXTAPE_ARTIST",
    "title":"$MIXTAPE_TITLE",
    "ipfs":"$MIXTAPE_IPFS_HASH",
    "detach":"$MIXTAPE_SIGNATURE"
}
EOF

}

title(){
    echo "AK mixtape block creator"
    echo "========================"
}

title

if [ ! -z $3 ];
then
    PWD="$(pwd)"
    MIXTAPE_ARTIST="$1"
    MIXTAPE_TITLE="$2"
    MIXTAPE_FILE="$PWD/$3"
    main
    cat $PWD/data | json_pp
    # sh pack_z_block.sh mixtape/add $PWD/data
else usage
fi
