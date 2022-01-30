#!/bin/bash
export IPFS="$(which ipfs)"
export ROOT=$HOME
export WORKDIR="$ROOT/.arching-kaos"
export CONFIGDIR="$WORKDIR/config"
export BINDIR="$WORKDIR/bin"
export ARCHIVESDIR="$WORKDIR/archives"
export GENESIS="$CONFIGDIR/genesis"
export GENESISASC="$CONFIGDIR/genesis.asc"
export ZGENESIS="$CONFIGDIR/zgenesis"
export ZGENESISASC="$CONFIGDIR/zgenesisasc"
export ZCHAIN="$CONFIGDIR/zchain"
export ZCHAINASC="$CONFIGDIR/zchain.asc"
export ZZCHAIN="$CONFIGDIR/zzchain"
export ZLIST="$WORKDIR/zlist"
export ZLATEST="$WORKDIR/zlatest"
export LOGSFILE="$WORKDIR/logs"
export FINGERPRINT="$(gpg2 --list-keys | grep kaos@kaos.kaos -1 | head -n1 | awk '{print $1}')"

