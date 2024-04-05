import { instance } from '@/api/instance';

type User = {
  accessToken: string;
  nickname: string;
  profile: string;
  isGhost: boolean;
};

type GoogleProps = {
  code: string;
  setUser: (user: User) => void;
};

const GoogleLoginRedirectComponent = ({ code, setUser }: GoogleProps) => {
  instance
    .get(`/auth/oauth-login/google?code=${code}`)
    .then((res) => {
      if (res && res.data) {
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

export default GoogleLoginRedirectComponent;
