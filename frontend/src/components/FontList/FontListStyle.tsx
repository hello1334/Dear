import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledSwiper = styled.div`
  .swiper {
    width: 240px;
    height: 320px;
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-size: 22px;
    font-weight: bold;
    color: black;
    background-color: white;
  }
`;

export const SlideContent = styled.div<{ $fontName: string }>`
  font-family: ${(props) => `"${props.$fontName}", sans-serif`};
`;

export const FontHeadLine = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
`;
