import userStore from '@/store/userStore';

import NaverLoginRedirectComponent from '@/components/LoginRedirect/NaverLoginRedirect';

const NaverLoginRedirection = () => {
  const PARAMS = new URL(window.location.href).searchParams;
  const NAVER_CODE: string = PARAMS.get('code')!;

  const { setUser } = userStore();
  return (
    <div>
      <NaverLoginRedirectComponent code={NAVER_CODE} setUser={setUser} />
    </div>
  );
};

export default NaverLoginRedirection;
