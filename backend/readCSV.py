def readCSV(csvFile):
    with open("files/" + csvFile) as f:
        s = f.read() + '\n' # add trailing new line character
    return repr(s)