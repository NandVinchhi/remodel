from diffusers import DiffusionPipeline
import uuid

from ollama import chatCompletion

pipe = DiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")
pipe = pipe.to("mps")

# Recommended if your computer has < 64 GB of RAM
pipe.enable_attention_slicing()

# SamplePrompt: prompt = "a photo of an astronaut riding a horse on mars"

def stableDiffuse(prompt):
    # First-time "warmup" pass if PyTorch version is 1.13 (see explanation above)
    _ = pipe(chatCompletion(f"Generate an evocative image generation prompt based on this text: {prompt}"), num_inference_steps=1)

    # Results match those from the CPU device after the warmup pass.
    image = pipe(prompt).images[0]

    name = str(uuid.uuid4()) + ".png"

    image.save("files/" + name)
    return name
