import os
from supabase import create_client, Client
from credentials import SUPABASE_URL, SUPABASE_SERVICE_KEY
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

import uuid

from imageCaption import imageToText
from ocr import ocr
from readCSV import readCSV
from readPDF import readPDF
from speechToText import speechToText
from ollama import chatCompletion
from stableDiffusion import stableDiffuse
from sendSMS import sendSMS

url: str = SUPABASE_URL
key: str = SUPABASE_SERVICE_KEY

supabase: Client = create_client(url, key)

def replace_attributes(s, attributeMap):
    for key, value in attributeMap.items():
        s = s.replace("{" + key + "}", str(value))
    return s

def get_inputs(id):
    k = supabase.table("InputBlocks").select("*").eq("entity_id", id).execute()
    for i in k:
        return i[1]

def get_processors(id):
    k = supabase.table("ProcessorBlocks").select("*").eq("entity_id", id).execute()
    for i in k:
        return i[1]

def get_outputs(id):
    k = supabase.table("OutputBlocks").select("*").eq("entity_id", id).execute()
    for i in k:
        return i[1]

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = 'files'
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'gif', 'csv', 'mp3'}  # Modify or extend this as per your requirements

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/call', methods=['POST'])
def postdata():
    try:
        data = request.json
        entity_id = data['id']
        attributeMap = data['data']
        print(attributeMap)
        inputs = get_inputs(int(entity_id))
        
        for i in inputs:
            if i['input_type'] == 'image':
                attributeMap[i['attribute']] = imageToText(attributeMap[i['attribute']])
            elif i['input_type'] == 'pdf':
                attributeMap[i['attribute']] = readPDF(attributeMap[i['attribute']])
            elif i['input_type'] == 'csv':
                attributeMap[i['attribute']] = readCSV(attributeMap[i['attribute']])
            elif i['input_type'] == 'voice':
                attributeMap[i['attribute']] = speechToText(attributeMap[i['attribute']])


        processors = get_processors(int(entity_id))

        for i in processors:
            if i["processor_type"] == 'text2text':
                attributeMap[i["attribute"]] = chatCompletion(replace_attributes(i["prompt"], attributeMap))
            elif i["processor_type"] == 'text2image':
                attributeMap[i["attribute"]] = stableDiffuse(replace_attributes(i["prompt"], attributeMap))

        outputs = get_outputs(int(entity_id))

        print(attributeMap)

        final = []

        for i in outputs:
            if i["output_type"] == "sms":
                sendSMS(replace_attributes(i["text_content"], attributeMap), i["phone_number"])
            elif i["output_type"] == "image":
                final.append({ "type": "image", "title": i["title"], "url": "http://127.0.0.1:5000/files/" + attributeMap[i["attribute"]]})
            elif i["output_type"] == "text":
                final.append({ "type": "text", "title": i["title"], "data": replace_attributes(i["text_content"], attributeMap)})

        return jsonify({"message": "Data received!", "data": final}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify(error='No file part'), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(error='No selected file'), 400
    if file and allowed_file(file.filename):
        file_extension = file.filename.rsplit('.', 1)[1].lower()
        generated_uuid = str(uuid.uuid4())
        filename = f"{generated_uuid}.{file_extension}"
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({"data":filename})
    else:
        return jsonify(error="Invalid file type"), 400
    
@app.route('/files/<filename>', methods=['GET'])
def serve_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)