import whisper

model = whisper.load_model("base")

def speechToText(mp3File):
    result = model.transcribe("files/" + mp3File)
    return result["text"]