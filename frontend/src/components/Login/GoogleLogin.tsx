import Google from '@/assets/images/google.png';

import * as S from '@/components/Login/LoginStyle';

const GoogleLogin = () => {
  const GOOGLE_REDIRECT_URI: string | undefined = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const GOOGLE_CLIENT_ID: string | undefined = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  return (
    <S.LoginButtonBox onClick={handleGoogleLogin}>
      <S.LoginButtonImg src={Google} alt="Google Img" />
    </S.LoginButtonBox>
  );
};

export default GoogleLogin;
