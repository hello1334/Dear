from django.conf import settings

from .content import TMIDIX
from .content.lwa_transformer import *
from fuzzywuzzy import process
from django.http import JsonResponse
import torch
import base64
from googletrans import Translator

def load_music_composer_model():
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    dtype = {'bfloat16': torch.bfloat16, 'float16': torch.float16, 'float32': torch.float32}[settings.MODEL_PRECISION]
    model_path = settings.MODEL_PATH
    print("torch version: ", torch.__version__)
    print("Device: ", device)
    print("Model Path: ", model_path)

    # 모델 인스턴스를 생성합니다.
    model = LocalTransformer(
        num_tokens=2831,
        dim=1024,
        depth=36,
        causal=True,
        local_attn_window_size=512,
        max_seq_len=4096
    )
    model = torch.nn.DataParallel(model)
    model = model.to(device).to(dtype)

    state_dict = torch.load(model_path, map_location=device)
    model.load_state_dict(state_dict)
    model.eval()

    return model


def generate_music(request):
    ko_prompt = request.GET.get('title', '')
    translator = Translator()
    ko_prompt = translator.translate(ko_prompt, src='ko', dest='en')
    tokenized_text = ko_prompt.text.split('_')
    song_title = ' '.join(tokenized_text)
    artist_name = song_title + ' Slow Piano Melody for Letter'
    model = load_music_composer_model()
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    titles_index = [song[0] for song in settings.AUX_DATA]
    search_string = f"{song_title} --- {artist_name}" if artist_name else song_title
    search_match = process.extractOne(query=search_string, choices=titles_index)
    search_index = titles_index.index(search_match[0])
    print("search_index .", search_index)
    selected_song_data_out = settings.AUX_DATA[search_index][1]
    block_marker = sum([(y * 10) for y in selected_song_data_out if y < 128]) / 1000

    inp = [selected_song_data_out] * 4

    inp = torch.LongTensor(inp).cuda()

    input_sequence = torch.LongTensor([selected_song_data_out]).to(device)
    print(input_sequence)

    # 생성할 음악의 길이 및 기타 설정
    number_of_tokens_to_generate = 32
    temperature = 0.9
    input_sequence = torch.LongTensor([selected_song_data_out]).to(device)
    print(input_sequence)
    # DataParallel 객체인 경우 내부 모델에 접근하여 사용
    if isinstance(model, torch.nn.DataParallel):
        model = model.module
    print(model)
    # generate 메서드를 호출하여 음악 생성
    with torch.no_grad():
        output = model.generate(input_sequence, seq_len=number_of_tokens_to_generate
                                , temperature=temperature, return_prime=True, min_stop_token=0, verbose=True)
    print(output)
    print("-------------------")
    output_sequence = output.tolist()[0]
    print(output_sequence)
    song = output_sequence
    song_f = []
    tim = 0
    son = []
    song1 = []

    for s in song:
        if s >= 128 and s < (12 * 128) + 1152:
            son.append(s)
        else:
            if len(son) == 3:
                song1.append(son)
            son = []
            son.append(s)

    for ss in song1:
        tim += ss[0] * 10

        dur = ((ss[1] - 128) // 8) * 20
        vel = (((ss[1] - 128) % 8) + 1) * 15

        channel = (ss[2] - 1152) // 128
        pitch = (ss[2] - 1152) % 128

        song_f.append(['note', tim, dur, channel, pitch, vel])

    detailed_stats = TMIDIX.Tegridy_ms_SONG_to_MIDI_Converter(song_f,
                                                              output_signature='Los Angeles Music Composer',
                                                              output_file_name='./dear/content/Los-Angeles-Music-Composer-Music-Composition',
                                                              track_name='Project Los Angeles',
                                                              list_of_MIDI_patches=[0, 24, 32, 40, 42, 46, 56, 71,
                                                                                        73, 0, 53, 19, 0, 0, 0, 0]
                                                              )
    encoded_music = base64.b64encode(detailed_stats).decode('utf-8')
    print('=' * 70)
    print('Displaying resulting composition...')
    print('=' * 70)
    return JsonResponse({'music_base64': encoded_music})