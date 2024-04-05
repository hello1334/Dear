import { createGlobalStyle } from 'styled-components';

import Miniver from '@/styles/fonts/Miniver-Regular.ttf';
import 가람연꽃 from '@/styles/fonts/가람연꽃.ttf';
import 갈맷글 from '@/styles/fonts/갈맷글.ttf';
import 강부장님체 from '@/styles/fonts/강부장님체.ttf';
import 강인한위로 from '@/styles/fonts/강인한 위로.ttf';
import 고딕아니고고딩 from '@/styles/fonts/고딕 아니고 고딩.ttf';
import 고려글꼴 from '@/styles/fonts/고려글꼴.ttf';
import 곰신체 from '@/styles/fonts/곰신체.ttf';
import 규리의일기 from '@/styles/fonts/규리의 일기.ttf';
import 금은보화 from '@/styles/fonts/금은보화.ttf';
import 혜준체 from '@/styles/fonts/혜준체.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Miniver';
    src: url(${Miniver}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Julius Sans One';
    font-style: normal;
    font-weight: 400;
    src: local('Julius Sans One'), url('https://fonts.cdnfonts.com/s/15972/JuliusSansOne-Regular.woff') format('woff');
  }

  @font-face {
    font-family: '가람연꽃';
    src: url(${가람연꽃}) format('truetype');
  }

  @font-face {
    font-family: '갈맷글';
    src: url(${갈맷글}) format('truetype');
  }

  @font-face {
    font-family: '강부장님체';
    src: url(${강부장님체}) format('truetype');
  }

  @font-face {
    font-family: '강인한위로';
    src: url(${강인한위로}) format('truetype');
  }

  @font-face {
    font-family: '고딕아니고고딩';
    src: url(${고딕아니고고딩}) format('truetype');
  }
  
  @font-face {
    font-family: '고려글꼴';
    src: url(${고려글꼴}) format('truetype');
  }

  @font-face {
    font-family: '곰신체';
    src: url(${곰신체}) format('truetype');
  }

  @font-face {
    font-family: '규리의일기';
    src: url(${규리의일기}) format('truetype');
  }

  @font-face {
    font-family: '금은보화';
    src: url(${금은보화}) format('truetype');
  }

  @font-face {
    font-family: '혜준체';
    src: url(${혜준체}) format('truetype');
  }
`;
