import { useEffect, useState, useRef } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import html2canvas from 'html2canvas';

import CandyImg from '@/assets/letter/deco/candy.png';
import FallImg from '@/assets/letter/deco/fall.png';
import HouseImg from '@/assets/letter/deco/house.png';
import RoseImg from '@/assets/letter/deco/rose.png';
import SnowImg from '@/assets/letter/deco/snow.png';
import useLetterStore from '@/store/letterStore';

import { instance } from '@/api/instance';

import * as S from './indexStyle';
import LetterShape from './LetterShape';
import LetterText from './LetterText';
import ToolBarContents from './ToolBarContents';

interface LetterReqDto {
  dearNickname: string;
  dear: string;
  from: string;
  isNew: boolean;
  stampId?: number;
}

const LetterDeco = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedType, setSelectedType] = useState<string>('');
  const { letter, letterText, letterDeco, resetLetter } = useLetterStore((state) => ({
    letter: state.letter,
    letterText: state.letterText,
    letterDeco: state.letterDeco,
    resetLetter: state.resetLetter,
  }));
  const navigate = useNavigate();
  const { Kakao } = window as any;

  const realUrl = 'https://dear103.store';

  window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('kakaoShared')) {
      redirect('/stamps');
    }
  };

  const shareKakaoLink = (url: string) => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      installTalk: true,
      content: {
        title: `${letter.from}님으로 편지가 도착했어요!`,
        description: '편지를 확인해보세요!',
        imageUrl: url,
        link: {
          mobileWebUrl: realUrl,
          webUrl: realUrl,
        },
      },
      buttons: [
        {
          title: '편지 작성하러가기',
          link: {
            mobileWebUrl: realUrl,
            webUrl: realUrl,
          },
        },
      ],
      serverCallbackArgs: {
        kakaoShared: 'kakaoShared',
      },
    });
  };

  const sendLetter = () => {
    if (letter.dearNickname !== '') {
      const letterReqDto: LetterReqDto = {
        dearNickname: letter.dearNickname,
        dear: letter.dear,
        from: letter.from,
        isNew: letterDeco.stamp === -1,
      };

      if (letterDeco.stamp !== -1) {
        letterReqDto.stampId = letterDeco.stamp;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      else {
        html2canvas(canvas).then((canvas) => {
          canvas.toBlob((blob) => {
            if (!blob) return;
            const file = new File([blob], 'image-download.png', { type: 'image/png' });

            const jsonData = JSON.stringify(letterReqDto);
            const blobData = new Blob([jsonData], { type: 'application/json' });

            const formData = new FormData();
            formData.append('letterReqDto', blobData);
            formData.append('letter', file);
            formData.append;
            if (!letterDeco.stampImage) {
              toast.info('우표가 생성중입니다. 잠시만 기다려주세요. ');
            }
            if (letterReqDto.isNew && letterDeco.stampImage) {
              formData.append('stampFile', letterDeco.stampImage);
            }
            console.log(letterReqDto);
            console.log(file);
            console.log(letterDeco.stampImage);
            instance
              .post('/letter/letters', formData)
              .then((res) => {
                if (res && res.data.code === 200) {
                  resetLetter();
                  redirect('/stamps');
                  navigate('/stamps');
                }
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
      }
    } else {
      const canvas = canvasRef.current;
      if (!canvas) return;
      else {
        html2canvas(canvas).then((canvas) => {
          canvas.toBlob((blob) => {
            if (!blob) return;
            const file = new File([blob], 'image-download.png', { type: 'image/png' });

            const formData = new FormData();
            formData.append('file', file);

            instance
              .post('/letter/s3', formData)
              .then((res) => {
                if (res && res.status === 200) {
                  shareKakaoLink(res.data);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
      }
    }
  };

  const handleClickType = (type: string) => {
    setSelectedType(type);
  };

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init('2b142a36e131e567924ec317ef67b6fc');
    console.log('Kakao 연결 확인', Kakao.isInitialized());
  }, [Kakao]);

  useEffect(() => {
    console.log(letter);
  }, [letter]);

  const toolBarType = ['편지지', '우표', '폰트', '음악'];
  const letterDecoImages = [SnowImg, HouseImg, RoseImg, FallImg, CandyImg];

  return (
    <S.PageContainer>
      <S.LetterCanvas ref={canvasRef}>
        <LetterShape type={letterDeco.image} shapes={letterDecoImages}>
          <LetterText dear={letter.dear} from={letter.from} text={letterText} />
        </LetterShape>
      </S.LetterCanvas>
      <S.EditorToolBarContainer>
        <S.ToolBarButtonContainer>
          {toolBarType.map((type) => (
            <S.Tag
              onClick={() => {
                handleClickType(type);
              }}
              key={type}
              $isActive={type == selectedType}
            >
              {type}
            </S.Tag>
          ))}
        </S.ToolBarButtonContainer>
        <ToolBarContents type={selectedType} images={letterDecoImages} />
        <S.Button onClick={() => sendLetter()}>편지 전송하기</S.Button>
      </S.EditorToolBarContainer>
    </S.PageContainer>
  );
};

export default LetterDeco;
