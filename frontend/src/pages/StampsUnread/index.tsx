import { useState, useEffect } from 'react';
import Slider from 'react-slick';

import { format, parseISO } from 'date-fns';

// import * as T from '@/test/TestApi';
import { instance } from '@/api/instance';

import * as S from '@/pages/StampsUnread/indexStyle';
import { FakeUnReadStamp } from '@/pages/StampsUnread/indexTypes';

import Loading from '@/components/Loading/Loading';
import Music from '@/components/Music/Music';
import UnEnvelopeLetter from '@/components/UnEnvelopeLetter/UnEnvelopeLetter';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StampsUnread = () => {
  const [stampData, setStampData] = useState<FakeUnReadStamp[] | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  const fetchStampData = () => {
    // const stamps = T.FakeUnReadStamps.data.stamps;
    // const updatedStamplist = stamps.map((stamp: FakeUnReadStamp) => {
    //   return {
    //     ...stamp,
    //     createAt: format(parseISO(stamp.createAt), 'h:mm, EEE dd MMM'),
    //   };
    // });
    // console.log(updatedStamplist, '확인용');
    // setStampData(updatedStamplist);
    instance
      .get('/letter/stamps/unRead')
      .then((res) => {
        console.log(res.data.data, '확인용');
        if (res.data.data === null) return setStampData(null);
        else {
          const stamps = res.data.data;
          const updatedStamplist = stamps.map((stamp: FakeUnReadStamp) => {
            return {
              ...stamp,
              createAt: format(parseISO(stamp.createAt), 'h:mm, EEE dd MMM'),
            };
          });
          setStampData(updatedStamplist);
        }
      })
      .catch((error) => {
        console.error('우표를 가져오는 중 오류 발생:', error);
      });
  };

  useEffect(() => {
    fetchStampData();
  }, []);

  useEffect(() => {
    console.log('최종데이터', stampData);
  }, [stampData]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    scroll: false,
    afterChange: (index: number) => {
      setCurrentSlideIndex(index);
    },
  };

  if (stampData === null) {
    return <Loading />;
  }

  return (
    <S.Container>
      <Slider {...settings}>
        {stampData?.map((stampD, index) => (
          <div key={index}>
            <Music music={stampD.music} isPlaying={index === currentSlideIndex} />
            <UnEnvelopeLetter stamplist={stampD} />
            <S.TextBox>우표를 클릭하면 편지가 보입니다.</S.TextBox>
          </div>
        ))}
      </Slider>
    </S.Container>
  );
};

export default StampsUnread;
