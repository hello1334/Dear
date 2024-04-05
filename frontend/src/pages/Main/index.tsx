import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import LoadingStore from '@/store/loadingStore';

import { instance } from '@/api/instance';

import Loading from '@/components/Loading/Loading';
import Main3D from '@/components/Main3D/Main3D';
import AccepModal from '@/components/Modal';

import * as S from './indexStyle';

const Main = () => {
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState<boolean>(false);
  const [checkText, setCheckText] = useState<string>('');
  const [checkInputDuplication, setCheckInputDuplication] = useState<boolean>(false);
  const [checkInputLength, setCheckInputLength] = useState<boolean>(false);
  const [checkDuplication, setCheckDuplication] = useState<boolean>(false);
  const [Ok, setOk] = useState<boolean>(false);
  const navigate = useNavigate();
  const isModelLoaded = LoadingStore((state) => state.isModelLoaded);
  const [isRight, setIsRight] = useState<boolean>(false);

  useEffect(() => {
    const loginState: string | null = localStorage.getItem('login-state');

    if (!loginState || !JSON.parse(loginState).state.accessToken) {
      navigate('/login');
    } else {
      // 엑세스토큰은 있지만 유저의 닉네임이 없을경우
      const user = JSON.parse(localStorage.getItem('login-state')!).state;
      if (user.nickname === null) {
        // 'nickname' 키에 대한 값이 null인 경우 여기에 코드 작성
        console.log('닉네임이 설정되지 않았습니다.');

        // 예: 'nickname'이 null일 때 기본 닉네임을 설정하는 경우
        setIsAcceptModalOpen(true);
      }
    }
  });

  const goToDuplication = () => {
    // 엑시오스로 닉네임 같은지 검사2
    instance
      .post('/user/users/nickname', {
        nickname: checkText,
      })
      .then((response) => {
        console.log('Data:', response.data); // 성공 시 데이터 출력
        if (response.data.data) {
          console.log('사용가능한 닉네임입니다.');
          setOk(true);
          setCheckDuplication(true);
        } else {
          console.log('중복된 닉네임입니다.');
          setCheckInputDuplication(true);
        }
      })
      .catch((err) => {
        console.error('error', err);
      });
    // 닉네임이 유일하면 ok변수를 true로 변경 중복체크는 false
  };
  const backToHome = () => {
    instance
      .put('/user/users/nickname', {
        nickname: checkText,
      })
      .then((response) => {
        console.log('Data:', response.data); // 성공 시 데이터 출력
        if (response.data.code === 200) {
          console.log('닉네임이 수정되었습니다.', checkText);
          setIsAcceptModalOpen(false);

          // 'login-state' 키로 저장된 값을 가져옵니다.
          const loginState = localStorage.getItem('login-state');

          if (loginState) {
            // 문자열을 JSON 객체로 변환합니다.
            const stateObj = JSON.parse(loginState);

            // nickname 값을 원하는 값으로 변경합니다.
            // 예시로 'newNickname'을 사용하겠습니다.
            stateObj.state.nickname = checkText;

            // JSON 객체를 다시 문자열로 변환합니다.
            const updatedLoginState = JSON.stringify(stateObj);

            // 변경된 값을 로컬 스토리지에 저장합니다.
            localStorage.setItem('login-state', updatedLoginState);

            // 로그로 확인
            console.log('Nickname updated:', stateObj.state.nickname);
          }
        } else {
          console.log('닉네임이 수정되지 않았습니다.');
        }
      })
      .catch((err) => {
        console.error('error', err);
      });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 13) {
      setCheckText(e.target.value);
      setOk(false);
      setCheckInputLength(false);
      setCheckInputDuplication(false);
      setCheckDuplication(false);
    }
  };

  return (
    <>
      <S.MainContainer>
        {isModelLoaded ? null : <Loading />}
        <S.LoadingCheck $isVisible={isModelLoaded}>
          <S.Logocontainer />
          <Main3D isRight={isRight} setIsRight={setIsRight}></Main3D>
          <S.ArrowContainer>
            <S.ArrowWrapper>
              <S.Arrow $isRight={isRight} />
              <S.Arrow $isRight={isRight} />
              <S.Arrow $isRight={isRight} />
            </S.ArrowWrapper>
          </S.ArrowContainer>
        </S.LoadingCheck>
        <AccepModal isOpen={isAcceptModalOpen} onClose={() => setIsAcceptModalOpen(false)}>
          <S.ModalInner>
            <p style={{ fontSize: '18px', marginTop: '30px', marginBottom: '30px' }}>
              중복되지 않는 닉네임을 설정해 주세요.
            </p>
            <S.InputTag type="text" value={checkText} placeholder="닉네임을 입력해주세요." onInput={handleChange} />
            {checkInputDuplication ? <S.DuplicationPTag>중복된 닉네임입니다.</S.DuplicationPTag> : null}
            {checkInputLength ? <S.DuplicationPTag>닉네임은 15자 이내로 설정해야 합니다.</S.DuplicationPTag> : null}
            {Ok ? <S.PossiblePTag>사용가능한 닉네임입니다.</S.PossiblePTag> : null}
            <S.AnswerStrap>
              {!checkDuplication ? (
                <S.DuplicationButton onClick={goToDuplication}>중복체크</S.DuplicationButton>
              ) : (
                <S.YesButton onClick={backToHome}>확인</S.YesButton>
              )}
            </S.AnswerStrap>
          </S.ModalInner>
        </AccepModal>
      </S.MainContainer>
    </>
  );
};

export default Main;
