# ak proto

class AK:
    init = False
    db = None
    daemon = bool() 
    packets = []

    def __init__(__name__):
        print("!!! Arching Kaos starts !!!")
        return None

class Daemon:
    def __init__(__name__):
        print("+ Daemon is starting...")
        Daemon.net()
        db = DB()
        print("! Daemon started!")
        return None

    def net():
        print("\t+ Network is connected")

class DB:
    def __init__(__name__):
        print("\t+ Database system in place")
        return None 


def entrypoint():
    a = AK()
    d = Daemon()
    return "done"

print(entrypoint())
