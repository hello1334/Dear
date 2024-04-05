import { instance } from '@/api/instance';

type User = {
  accessToken: string;
  nickname: string;
  profile: string;
  isGhost: boolean;
};

type KakaoProps = {
  code: string;
  setUser: (user: User) => void;
};

const KakaoLoginRedirectComponent = ({ code, setUser }: KakaoProps) => {
  instance
    .get(`/auth/oauth-login/kakao?code=${code}`)
    .then((res) => {
      if (res && res.data) {
        console.log(res);
        const user: User = {
          accessToken: res.data.accessToken,
          nickname: res.data.nickname,
          profile: res.data.profile,
          isGhost: res.data.isGhost,
        };
        setUser(user);

        window.location.href = '/';
      }
    })
    .catch(() => {});
  return <></>;
};

export default KakaoLoginRedirectComponent;
