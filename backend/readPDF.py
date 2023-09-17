from PyPDF2 import PdfReader

def readPDF(pdfFile):
    reader = PdfReader(pdfFile)

    text = ""
    for i in range(len(reader.pages)):
        page = reader.pages[i]
        text = text + " " + page.extract_text()
    
    return text



