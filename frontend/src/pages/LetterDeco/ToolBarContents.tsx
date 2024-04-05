import { useEffect, useState } from 'react';

import Lottie from 'lottie-react';
import { IoMdArrowDropright, IoMdArrowDropleft } from 'react-icons/io';

import loadingLottie from '@/assets/lottie/loading.json';
// import TTImg from '@/assets/postimages/image_4.jpg';
import TestImg from '@/assets/postimages/image_5.jpg';
import useLetterStore from '@/store/letterStore';

import { instance } from '@/api/instance';

import Music from '@/components/Music/Music';
import { useIsOverflow } from '@/components/ScrollWidth/userIsOverflow';

import * as S from './ToolBarContentsStyle.tsx';

type ToolBarContentsProps = {
  type: string;
  images: string[];
};

type FontData = {
  id: number;
  name: string;
};

interface ImageProps {
  data: string;
  index: number;
  isSelected: boolean;
  onSelect: (selectedId: number) => void;
}

interface FontProps {
  data: FontData;
  isSelected: boolean;
  onSelect: (selectedId: number) => void;
}
interface StampProps {
  data: StampData;
  isSelected: boolean;
  onSelect: (selectedId: number) => void;
}

const fonts = [
  { id: 1, name: '가람연꽃' },
  { id: 2, name: '갈맷글' },
  { id: 3, name: '강부장님체' },
  { id: 4, name: '강인한위로' },
  { id: 5, name: '고딕아니고고딩' },
  { id: 6, name: '고려글꼴' },
  { id: 7, name: '곰신체' },
  { id: 8, name: '규리의일기' },
  { id: 9, name: '금은보화' },
  { id: 10, name: '혜준체' },
  { id: 11, name: 'Pretendard-Regular' },
  { id: 12, name: 'Miniver' },
  { id: 13, name: 'Julius Sans One' },
  { id: 14, name: '가람연꽃' },
  { id: 15, name: '갈맷글' },
  { id: 16, name: '강부장님체' },
  { id: 17, name: '강인한위로' },
  { id: 18, name: '고딕아니고고딩' },
  { id: 19, name: '고려글꼴' },
  { id: 20, name: '곰신체' },
  { id: 21, name: '규리의일기' },
  { id: 22, name: '금은보화' },
  { id: 23, name: '혜준체' },
  { id: 24, name: 'Pretendard-Regular' },
  { id: 25, name: 'Miniver' },
  { id: 26, name: 'Julius Sans One' },
];
type StampData = {
  stampId: number;
  image: string | null;
};

const ImageComponent = ({ data, index, isSelected, onSelect }: ImageProps) => {
  return (
    <S.ContentContainer $isSelected={isSelected} onClick={() => onSelect(index)}>
      <S.Image src={data} />
    </S.ContentContainer>
  );
};

const FontComponent = ({ data, isSelected, onSelect }: FontProps) => {
  return (
    <S.ContentContainer $isSelected={isSelected} onClick={() => onSelect(data.id)}>
      <S.FontWrapper $fontName={data.name}>
        <S.FontHeadLine>{data.name}</S.FontHeadLine>
        <p>가나다라마바사아</p>
        <p>a b c A B C</p>
        <p>1234567890</p>
      </S.FontWrapper>
    </S.ContentContainer>
  );
};
const StampComponent = ({ data, isSelected, onSelect }: StampProps) => {
  return (
    <S.ContentContainer $isSelected={isSelected} onClick={() => onSelect(data.stampId)}>
      {data.stampId == -1 ? (
        data.image ? (
          <S.Image src={`data:image/jpeg;base64,${data.image}`} />
        ) : (
          // <S.Image src={`${data.image}`} />
          <div style={{ width: '100px' }}>
            <Lottie animationData={loadingLottie} loop autoPlay />
          </div>
        )
      ) : (
        <S.Image src={data.image!} />
      )}
    </S.ContentContainer>
  );
};
type dataProps = {
  data?: string | null;
};
const MusicComponent = ({ data }: dataProps) => {
  const [aiMusic, setAiMusic] = useState<string | null>(null);
  const [button, setButton] = useState<boolean>(true);
  const getAiMusic = () => {
    setButton(false);
    setAiMusic('https://dear103.s3.ap-northeast-2.amazonaws.com/228f5743-233d-4417-a561-9b1d5b510ad2.mp3');
    console.log(data);
    // instance
    //   .post(`/letter/musics/generate`, {
    //     title: data,
    //   })
    //   .then((response) => {
    //     setAiMusic(response.data.music_base64);
    //   })
    //   .catch((error) => {
    //     console.error('음악error', error);
    //     setAiMusic(MusicMid);
    //   });
  };
  return (
    <S.MusicWrapper>
      {button ? (
        <S.Button onClick={getAiMusic}>음악 생성하기</S.Button>
      ) : aiMusic ? (
        <Music music={aiMusic} isPlaying />
      ) : (
        <S.MusicLoadingWrapper>
          <Lottie animationData={loadingLottie} loop autoPlay />
        </S.MusicLoadingWrapper>
      )}
    </S.MusicWrapper>
  );
};
const ToolBarContents = ({ type, images }: ToolBarContentsProps) => {
  const [letter, letterDeco, setLetterDeco] = useLetterStore((state) => [
    state.letter,
    state.letterDeco,
    state.setLetterDeco,
  ]);
  const [stamps, setStamps] = useState<StampData[]>([]);

  useEffect(() => {
    console.log('편지꾸미기 store정보', letterDeco);
  }, [letterDeco]);
  const createAiText = () => {
    let sentence = '';
    sentence += `${letter.emotion}_${letter.background}`;

    if (letter.characteristics.length > 0) {
      sentence += `${letter.characteristics.join('_')}`;
    }
    if (letter.memories.length > 0) {
      sentence += `${letter.memories.join('_')}`;
    }
    if (letter.options.length > 0) {
      sentence += `${letter.options.join('_')}`;
    }
    return sentence;
  };
  const text = createAiText();

  function base64ToFile(base64Data: string, filename: string) {
    const binaryStr = atob(base64Data);
    const byteArray = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      byteArray[i] = binaryStr.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'image/png' });
    const file = new File([blob], filename, { type: 'image/png' });
    return file;
  }

  useEffect(() => {
    const getAiStamp = () => {
      console.log('우표리스트', stamps);
      const prompt = createAiText();
      console.log('프롬프트', prompt);
      instance
        .post('https://5979fa78c2fd96ac75.gradio.live/run/predict', {
          data: ['stamp has boy picture'],
          event_data: null,
          fn_index: 0,
          session_hash: 'i602z10uxz8',
        })
        .then((response) => {
          if (response) {
            console.log('우표응답', response.data.data[0]);
            const file = base64ToFile(response.data.data[0], 'image-random.png');
            setLetterDeco({ stampImage: file });
            setStamps((prev) => {
              const temp = [...prev];
              temp[0].image = response.data.data[0];
              return temp;
            });
          } else {
            console.log('우표응답이 없습니다.');
          }
        })
        .catch((error) => {
          console.error('우표AI error', error);
          const blob = new Blob([TestImg], { type: 'image/jpeg' });
          const imgFile = new File([blob], 'image_6.jpg', { type: 'image/jpeg' });
          setLetterDeco({ stampImage: imgFile });
        });
    };

    const getPurchasedStamps = async () => {
      await instance
        .get('/letter/purchase-stamps')
        .then((response) => {
          setStamps([
            {
              stampId: -1,
              image: null,
            },
            ...response.data.data,
          ]);
        })
        .catch((error) => {
          console.error('구매우표리스트 API오류', error);
          setStamps([
            {
              stampId: -1,
              image: null,
            },
          ]);
        });
      getAiStamp();
    };

    getPurchasedStamps();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [ref] = useIsOverflow<HTMLDivElement>();

  const handleNextButtonClick = (nextType: 'prev' | 'next') => {
    if (!ref.current) return;
    const scrollAmount = ref.current.offsetWidth;
    const newScrollPosition =
      nextType === 'prev' ? ref.current.scrollLeft - scrollAmount : ref.current.scrollLeft + scrollAmount;

    ref.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };
  const handleSelect = (id: number) => {
    if (type === '편지지') setLetterDeco({ image: id });
    if (type === '우표') setLetterDeco({ stamp: id });
    if (type === '폰트') {
      setLetterDeco({ font: id });
      const selectedFont = fonts.find((font) => font.id === id);
      if (selectedFont) setLetterDeco({ fontName: selectedFont.name });
    }
  };

  return (
    <S.ToolBarContainer>
      {type !== '' && (
        <S.ArrowLeftButtonWrapper onClick={() => handleNextButtonClick('prev')}>
          <IoMdArrowDropleft size={30} color="white" />
        </S.ArrowLeftButtonWrapper>
      )}

      <S.ToolBarContentsContainer ref={ref}>
        {type === '편지지' &&
          images.map((image, index) => (
            <ImageComponent
              key={index}
              index={index}
              data={image}
              isSelected={index === letterDeco.image}
              onSelect={handleSelect}
            />
          ))}
        {type === '폰트' &&
          fonts.map((font) => (
            <FontComponent key={font.id} data={font} isSelected={font.id === letterDeco.font} onSelect={handleSelect} />
          ))}

        {type === '우표' &&
          stamps.map((stamp) => (
            <StampComponent
              key={stamp.stampId}
              data={stamp}
              isSelected={stamp.stampId === letterDeco.stamp}
              onSelect={handleSelect}
            />
          ))}
        {type === '음악' && <MusicComponent data={text}></MusicComponent>}
      </S.ToolBarContentsContainer>
      {type !== '' && (
        <S.ArrowRightButtonWrapper onClick={() => handleNextButtonClick('next')}>
          <IoMdArrowDropright size={30} color="white" />
        </S.ArrowRightButtonWrapper>
      )}
    </S.ToolBarContainer>
  );
};
export default ToolBarContents;
