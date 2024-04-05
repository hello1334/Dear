// Import Swiper React components
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as S from './FontListStyle';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules

export default function FontList() {
  const fonts = [
    { name: '가람연꽃' },
    { name: '갈맷글' },
    { name: '강부장님체' },
    { name: '강인한위로' },
    { name: '고딕아니고고딩' },
    { name: '고려글꼴' },
    { name: '곰신체' },
    { name: '규리의일기' },
    { name: '금은보화' },
    { name: '혜준체' },
    { name: 'Pretendard-Regular' },
    { name: 'Miniver' },
    { name: 'Julius Sans One' },
    { name: '가람연꽃' },
    { name: '갈맷글' },
    { name: '강부장님체' },
    { name: '강인한위로' },
    { name: '고딕아니고고딩' },
    { name: '고려글꼴' },
    { name: '곰신체' },
    { name: '규리의일기' },
    { name: '금은보화' },
    { name: '혜준체' },
    { name: 'Pretendard-Regular' },
    { name: 'Miniver' },
    { name: 'Julius Sans One' },
  ];
  return (
    <S.StyledSwiper>
      <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="mySwiper">
        {fonts.map((font, index) => (
          <SwiperSlide key={index}>
            <S.SlideContent key={index} $fontName={font.name}>
              <S.FontHeadLine>{font.name}</S.FontHeadLine>
              <p>가나다라마바사아</p>
              <p>a b c A B C</p>
              <p>1234567890</p>
            </S.SlideContent>
          </SwiperSlide>
        ))}
      </Swiper>
    </S.StyledSwiper>
  );
}
