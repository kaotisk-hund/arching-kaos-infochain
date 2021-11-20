from edcode import encode
from stellar_sdk import Asset, Account, Keypair, Network, TransactionBuilder, Server
import sys
import config

def usage():
    print("""
    Usage: python send_as_ak_tx.py ZBLOCK_CID SECRET_KEY
    ZBLOCK_CID      The IPFS CID that got produced by pack_z_block.sh
    SECRET_KEY      The secret key of your stellar account

    Note: you 'll need to have an activated wallet and added trustline to the asset
    """)

def title():
    print("Send to the chain")
    print("=================")

def starting(f,sk):
    # Initialize Keypair
    root_keypair = Keypair.from_secret(sk)
    source_public_key = root_keypair.public_key
    #root_account = Account(account_id=root_keypair.public_key, sequence=1)
    server = Server(horizon_url="https://horizon.stellar.org")
    source_account = server.load_account(source_public_key)
    base_fee = server.fetch_base_fee()

    for i in f:
        print(i)
        transaction = (
            TransactionBuilder(
                source_account=source_account,
                network_passphrase=Network.PUBLIC_NETWORK_PASSPHRASE,
                base_fee=base_fee,
            )
            .add_text_memo(i)
            .append_payment_op(
                destination=source_account,
                asset=Asset(config.InfoAssetName, config.InfoAssetIssuer),
                amount=config.amount,)
            .set_timeout(30)
            .build()
        )
        transaction.sign(root_keypair)
        response = server.submit_transaction(transaction)
        print(response)

title()
if len(sys.argv)==2:
    f = encode(sys.argv[1])
    sk = config.sk
    start(f,sk)
if len(sys.argv)==3:
    f = encode(sys.argv[1])
    sk= sys.argv[2]
    start(f,sk)
else:
    usage()
