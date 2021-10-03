import filetype

def ft(file):
    kind = filetype.guess(file)
    if kind is None:
        print('Cannot guess file type!')
        return

    print('File extension: %s' % kind.extension)
    if kind.mime !="audio/x-flac":
        print("wrong type")
        return
    return kind

if __name__ == '__main__':
    ft("/home/kaotisk/Music/2021.07.24-unknown/01 - Fuzzonaut - Astral Travelers.flac")
