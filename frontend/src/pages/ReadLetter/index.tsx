import { useEffect } from 'react';

import { useLetterUrlStore } from '@/store/letterUrlStore';
import newStampStore from '@/store/newStampStore';

import { instance } from '@/api/instance';

import * as S from '@/pages/ReadLetter/indexStyle';

import { DownloadImage } from '@/components/DownloadImage/DownloadImage';

type Stamp = {
  stamp: string;
  dear: string;
  from: string;
  letterId: number;
  letter: string;
  music: string;
  musicTitle: string;
  createAt: string;
};

const ReadLetter = () => {
  const { letterUrls, letterId, setLetterUrls } = useLetterUrlStore();
  console.log('letterId:', letterId);
  console.log('letter:', letterUrls);

  const { stamps } = newStampStore();

  // 로컬 스토리지에서 letterUrls 상태 복구
  useEffect(() => {
    const storedState = localStorage.getItem('letterUrlState');
    if (storedState) {
      const { letterUrls } = JSON.parse(storedState);
      setLetterUrls(letterUrls);
    }
  }, []);

  useEffect(() => {
    if (letterId) {
      instance
        .post(`/letter/stamps/${letterId}/read`)
        .then((res) => {
          console.log(res.data, '읽음처리 완료');

          // 읽음 처리 후 스탬프 삭제
          const newStamps = stamps.filter((stamp: Stamp) => stamp.letterId !== letterId);
          newStampStore.setState({ stamps: newStamps });
        })
        .catch((error) => {
          console.error('읽음처리 실패 Error fetching letter urls:', error);
        });
    }
  }, [letterId, letterUrls]);

  return (
    <S.Container>
      {letterUrls && (
        <S.LetterImage src={letterUrls}>
          <S.DownloadButton
            onClick={() => {
              DownloadImage(letterUrls, letterId?.toString() ?? 'download');
            }}
          />
        </S.LetterImage>
      )}
    </S.Container>
  );
};

export default ReadLetter;
