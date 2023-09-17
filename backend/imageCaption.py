from transformers import pipeline

def imageToText(fileName):
    captioner = pipeline("image-to-text",model="Salesforce/blip-image-captioning-base")
    imageLink = 'http://127.0.0.1:5000/files/' + fileName
    return captioner(imageLink)[0]['generated_text']
