import { useEffect } from 'react';

import LoginStampImg from '@/assets/images/LoginStamp.png';

import * as S from '@/pages/Login/indexStyle';

import GoogleLogin from '@/components/Login/GoogleLogin';
import KakaoLogin from '@/components/Login/KakaoLogin';
import { LoginButtonWrapper } from '@/components/Login/LoginStyle';
import NaverLogin from '@/components/Login/NaverLogin';

const Login = () => {
  useEffect(() => {
    if (localStorage.getItem('login-state')) {
      localStorage.removeItem('login-state');
    }
  }, []);

  return (
    <S.PageContainer>
      <S.TextWrapper>
        <S.EmphasisText>간편하게!</S.EmphasisText>
        <S.EmphasisText>특별하게!</S.EmphasisText>
        <S.EmphasisText>내 글씨로 만드는 AI 편지</S.EmphasisText>
        <S.NormalText>이야기가 담긴 AI 우표로 전달할 수 있어요.</S.NormalText>
      </S.TextWrapper>
      <S.ImageWrapper>
        <S.StampImg src={LoginStampImg} alt="LoginStampImg" />
      </S.ImageWrapper>
      <S.ExplainTextWraper>
        <S.BlueExplainText>간편</S.BlueExplainText>
        <S.WhiteExplainText>하고</S.WhiteExplainText>
        &nbsp;
        <S.BlueExplainText>특별</S.BlueExplainText>
        <S.WhiteExplainText>하게 쓰는</S.WhiteExplainText>
        &nbsp;
        <S.YellowExplainText>편지</S.YellowExplainText>
      </S.ExplainTextWraper>
      <KakaoLogin></KakaoLogin>
      <LoginButtonWrapper>
        <GoogleLogin></GoogleLogin>
        <NaverLogin></NaverLogin>
      </LoginButtonWrapper>
    </S.PageContainer>
  );
};

export default Login;
