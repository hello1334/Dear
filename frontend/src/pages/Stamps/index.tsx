import { useState, useEffect } from 'react';

import TestImg1 from '@/assets/letter/test/stamp1.png';
import TestImg7 from '@/assets/letter/test/stamp10.png';
import TestImg2 from '@/assets/letter/test/stamp4.png';
import TestImg3 from '@/assets/letter/test/stamp6.png';
import TestImg4 from '@/assets/letter/test/stamp7.png';
import TestImg5 from '@/assets/letter/test/stamp8.png';
import TestImg6 from '@/assets/letter/test/stamp9.png';
import LoadingStore from '@/store/loadingStore';
import { useImageStore } from '@/store/stampStore';
//import * as T from '@/test/TestApi'; //가짜데이터

import { instance } from '@/api/instance'; //진짜데이터

import * as S from '@/pages/Stamps/indexStyle';
import { Stamp } from '@/pages/Stamps/indexTypes';

import WriteLetter from '@/components/EnvelopeLetter/WriteLetter';
import MailArelt from '@/components/MailArelt/MailArelt';
import TextFontBox from '@/components/TextFontBox/TextFontBox';

const Stamps = () => {
  const setModelLoaded = LoadingStore((state) => state.setModelLoaded);
  const { images1, setImages1, images2, setImages2 } = useImageStore(); //이미지 상태관리 => 이유는 letter에서도 사용하기 위함 사실기억안남
  const getRandomSpan = () => Math.ceil(Math.random() * 6) + 1; //랜덤배치
  const [activeTab, setActiveTab] = useState(1); // 1: DEAR ME, 2: FROM ME
  const currentImages: Stamp[] = activeTab === 1 ? (images1 as Stamp[]) : (images2 as Stamp[]); //현재 탭에 따라 이미지 변경
  const selectTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  }; //탭 선택
  useEffect(() => {
    setModelLoaded(false);
    const fetchData = (isDearMe: boolean) => {
      //가짜 데이터를 사용하고 있어서 주석처리함 밑에가 진짜 데이터
      // if (isDearMe) {
      //   setImages1(T.FakeStampstrue.data.stamps);
      //   console.log(T.FakeStampstrue.data.stamps);
      // } else {
      //   setImages2(T.FakeStampsfalse.data.stamps);
      // }
      instance
        .get(`/letter/stamps?isDearMe=${isDearMe}`)
        .then((res) => {
          const images = [TestImg1, TestImg2, TestImg3, TestImg4, TestImg5, TestImg6, TestImg7];
          console.log(images);
          if (isDearMe) {
            const data = res.data.data?.stamps;
            // const updatedStamps = data.map((stamp: any) => ({
            //   ...stamp,
            //   image: images[Math.floor(Math.random() * images.length)],
            // }));
            // setImages1(updatedStamps);
            setImages1(data);
          } else {
            const data = res.data.data?.stamps;
            // const updatedStamps = data.map((stamp: any) => ({
            //   ...stamp,
            //   image: images[Math.floor(Math.random() * images.length)],
            // }));
            // setImages2(updatedStamps);
            setImages2(data);
            // console.log(updatedStamps);
          }
        })
        .catch((error) => {
          console.error('Error fetching stamps:', error);
        });
    };

    fetchData(true);
    fetchData(false);
  }, [setImages1, setImages2, setModelLoaded]);

  return (
    <S.PageContainer>
      {/* <S.SearchInput placeholder="사용자명을 입력해주세요" /> */}
      <S.TabsContainer>
        <TextFontBox text="DEAR ME" margin={true} isFocus={activeTab === 1} onClick={() => selectTab(1)} />
        <TextFontBox text="From ME" margin={true} isFocus={activeTab === 2} onClick={() => selectTab(2)} />
        <MailArelt /> {/* 읽지않은 편지 */}
      </S.TabsContainer>
      <S.SliderContainer>
        <S.GridContainer>
          {currentImages?.map((image) => (
            <S.GridItem key={image.stampId} rowSpan={getRandomSpan()} colSpan={getRandomSpan()}>
              <S.GoMailLink to={`/stamp/${image.stampId}`}>
                <S.StyledImage src={image.image} alt={`Image ${image.stampId}`} />
              </S.GoMailLink>
            </S.GridItem>
          ))}
        </S.GridContainer>
      </S.SliderContainer>
      <WriteLetter />
    </S.PageContainer>
  );
};

export default Stamps;
