import userStore from '@/store/userStore';

import KakaoLoginRedirectComponent from '@/components/LoginRedirect/KakaoLoginRedirect';

const KakaoLoginRedirection = () => {
  const PARAMS = new URL(window.location.href).searchParams;
  const KAKAO_CODE: string = PARAMS.get('code')!;

  const { setUser } = userStore();
  return (
    <div>
      <KakaoLoginRedirectComponent code={KAKAO_CODE} setUser={setUser} />
    </div>
  );
};

export default KakaoLoginRedirection;
