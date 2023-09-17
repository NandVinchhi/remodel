# from transformers import TrOCRProcessor, VisionEncoderDecoderModel
# import requests
# from PIL import Image

# processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten")
# model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")

#url = "https://fki.tic.heia-fr.ch/static/img/a01-122-02.jpg"

# load image from the IAM dataset
def ocr(fileName):
    # imageLink = 'http://127.0.0.1:5000/files/' + fileName
    # image = Image.open(requests.get(imageLink, stream=True).raw).convert("RGB")

    # pixel_values = processor(image, return_tensors="pt").pixel_values
    # generated_ids = model.generate(pixel_values)

    # generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
    generated_text = "testing here"
    return generated_text