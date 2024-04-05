import Naver from '@/assets/images/naver.png';

import * as S from '@/components/Login/LoginStyle';

const NaverLogin = () => {
  const NAVER_REDIRECT_URI: string | undefined = import.meta.env.VITE_NAVER_REDIRECT_URI;
  const NAVER_CLIENT_ID: string | undefined = import.meta.env.VITE_NAVER_CLIENT_ID;

  const handleNaverLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=1234asdf`;
  };

  return (
    <S.LoginButtonBox onClick={handleNaverLogin}>
      <S.LoginButtonImg src={Naver} alt="Naver Img" />
    </S.LoginButtonBox>
  );
};

export default NaverLogin;
