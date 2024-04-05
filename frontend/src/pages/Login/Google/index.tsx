import userStore from '@/store/userStore';

import GoogleLoginRedirectComponent from '@/components/LoginRedirect/GoogleLoginRedirect';

const GoogleLoginRedirection = () => {
  const PARAMS = new URL(window.location.href).searchParams;
  const GOOGLE_CODE: string = PARAMS.get('code')!;

  const { setUser } = userStore();
  return (
    <div>
      <GoogleLoginRedirectComponent code={GOOGLE_CODE} setUser={setUser} />
    </div>
  );
};

export default GoogleLoginRedirection;
