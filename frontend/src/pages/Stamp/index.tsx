import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useImageStore } from '@/store/stampStore';
//import * as T from '@/test/TestApi'; //가짜데이터

import { instance } from '@/api/instance'; //진짜 데이터

import * as S from '@/pages/Stamp/indexStyle';

import EnvelopeLetter from '@/components/EnvelopeLetter/EnvelopeLetter';
import Music from '@/components/Music/Music';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { FakeStampData } from './indexTypes';

const Stamp = () => {
  const { stampId } = useParams<{ stampId?: string }>();
  const { images1, images2 } = useImageStore();
  const [stampData, setStampData] = useState<FakeStampData | null>(null);
  // let imageUrl: string | undefined;
  const [imageUrl, setImageUrl] = useState<string | undefined>(() => {
    return localStorage.getItem('imageUrl') ?? undefined;
  });

  useEffect(() => {
    const fetchStampData = () => {
      // if (stampId === undefined) {
      //   return; // stampId가 없으면 아무것도 하지 않음 -> 없을수가 없음 -> 아이디가 없는 경우는 에러임
      // } else if (stampId === '1') setStampData(T.FakeStamp1.data);
      // else if (stampId === '2') setStampData(T.FakeStamp2.data);
      instance
        .get(`/letter/stamps/${stampId}`)
        .then((res) => {
          console.log('우표 데이터:', res.data);
          console.log('우표 데이터:', res.data?.data);
          console.log('우표 데이터:', res.data?.data.musicUrl);
          setStampData(res.data?.data);
        })
        .catch((error) => {
          console.error('우표를 가져오는 중 오류 발생:', error);
        });
    };

    fetchStampData();
  }, [stampId]);

  useEffect(() => {
    if (stampId) {
      const imageFromImages1 = images1.find((image) => image.stampId === parseInt(stampId));
      if (imageFromImages1) {
        setImageUrl(imageFromImages1.image);
      } else {
        const imageFromImages2 = images2.find((image) => image.stampId === parseInt(stampId));
        if (imageFromImages2) {
          setImageUrl(imageFromImages2.image);
        }
      }
    }
  }, [stampId, images1, images2]);

  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem('imageUrl', imageUrl);
    }
  }, [imageUrl]);

  if (stampData === null) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <S.Container key={stampId}>
      <Music music={stampData.musicUrl} isPlaying />
      <EnvelopeLetter stamplist={stampData} imageUrl={imageUrl} />
      <S.TextBox>우표를 클릭하면 편지가 보입니다.</S.TextBox>
    </S.Container>
  );
};

export default Stamp;
