import subprocess

# Execute the command and capture the output
def chatCompletion(textInput):
    command = ["ollama", "run", "llama2", textInput]
    result = subprocess.run(command, capture_output=True, text=True, check=True)
    return result.stdout