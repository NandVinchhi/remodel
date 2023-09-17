from transformers import pipeline

link = "https://huggingface.co/datasets/Narsil/image_dummy/raw/main/parrots.png"

def imageToText(imageLink):
    captioner = pipeline("image-to-text",model="Salesforce/blip-image-captioning-base")
    return captioner(imageLink)[0]['generated_text']

