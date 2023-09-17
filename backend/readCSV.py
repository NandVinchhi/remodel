def readCSV(csvFile):
    with open(csvFile) as f:
        s = f.read() + '\n' # add trailing new line character
    return repr(s)