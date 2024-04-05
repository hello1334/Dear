from diffusers import StableDiffusionPipeline
import torch
import base64
from django.http import JsonResponse
import io
from googletrans import Translator

def generate_image(request):
    # 모델과 토큰 로드 (환경에 따라 다를 수 있음)
    model_id = "CompVis/stable-diffusion-v1-4"
    device = "cuda" if torch.cuda.is_available() else "cpu"

    pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
    pipe = pipe.to(device)

    pipe.load_lora_weights("./models", weight_name="sstamp.safetensors", adapter_name="stamp")
    pipe.set_adapters(["stamp"], adapter_weights=[1])
    # 요청에서 프롬프트 추출
    ko_prompt = request.GET.get('prompt', 'stamp')
    translator = Translator()
    ko_prompt = translator.translate(ko_prompt, src='ko', dest='en')
    tokenized_text = ko_prompt.text.split('_')
    prompt = ','.join(tokenized_text)
    prompt = '(postage_square_stamp, white_background), detailed, high_resolution, pastel_tone, ' + prompt + ', digital_painting'
    negative_prompt = '(bad-artist:0.8), (bad-hands-5:0.8), (bad-image-v2-39000:0.8), (easynegative:0.8), (Naked, Nude, NSFW, Erotica:2.0), duplicate, (poorly drawn face), cloned face, cross eyed, long neck, extra fingers, mutated hands, (fused fingers), (too many fingers), (missing arms), (missing legs), (extra arms), (extra legs), (poorly drawn hands), (bad anatomy), (bad proportions), (text), (signatures), lowres, (worst quality), (low quality), (normal quality), Out of Frame, blurry, jpeg artifacts, watermark, logo, letters, username, words, cropped, cartoon, split images'
    generator = torch.Generator("cuda").manual_seed(900)
    num_inference_step=30
    width = 512
    height = 512
    # 이미지 생성
    image = pipe(
        prompt,
        negative_prompt=negative_prompt,
        num_inference_steps=num_inference_step,
        width=width,
        height=height,
        generator=generator
    ).images[0]

    # 이미지 저장 (임시 방법)
    image_path = "./generated_image.png"
    image.save(image_path)

    # BytesIO 스트림을 사용해 메모리에 이미지 저장
    img_io = io.BytesIO()
    image.save(img_io, 'PNG')  # 이미지 포맷에 맞춰 'JPEG' 등 다른 형식을 사용할 수도 있습니다.
    img_io.seek(0)  # 스트림의 시작 위치로 커서 이동

    # Base64로 이미지 인코딩
    encoded_image = base64.b64encode(img_io.getvalue()).decode('utf-8')

    # 인코딩된 이미지를 JSON 형태로 클라이언트에 반환
    return JsonResponse({'stamp_image_base64': encoded_image})