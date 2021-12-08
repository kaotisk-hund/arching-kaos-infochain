#!/bin/bash
IPFS="$(which ipfs)"
ROOT=$HOME
WORKDIR="$ROOT/.arching-kaos"
CONFIGDIR="$ROOT/.arching-kaos/config"
GENESIS="$ROOT/.arching-kaos/config/genesis"
ZGENESIS="$ROOT/.arching-kaos/config/zgenesis"
ZCHAIN="$ROOT/.arching-kaos/config/zchain"
ZCHAIN_ASC="$ROOT/.arching-kaos/config/zchain.asc"
ZZCHAIN="$ROOT/.arching-kaos/config/zzchain"

if [[ ! -d $WORKDIR ]] ; then mkdir $WORKDIR ;fi
if [[ ! -d $CONFIGDIR ]] ; then mkdir $CONFIGDIR;fi
if [[ ! -z $GENESIS ]] ; then touch $GENESIS;fi
if [[ ! -z $ZGENESIS ]] ; then echo "$(ipfs add -q $GENESIS)" > $ZGENESIS;fi
if [[ ! -z $ZCHAIN ]] ; then echo "$(ipfs key gen zchain)" > $ZCHAIN;fi

# TODO GPG/PGP setup
# eg gpg2 --full-key-generate and/or gpg2 --set-default key
# or just question the user if they are going to use their
# existing one if any.

if [[ ! -z $ZCHAIN_ASC ]] ; then gpg2 -bao $ZCHAIN_ASC $ZCHAIN && echo "$(ipfs add -q $ZCHAIN_ASC)" > $ZZCHAIN;fi


# TODO The thing is done, we are sitting on a genesis.
# We also have an IPNS name to use.


