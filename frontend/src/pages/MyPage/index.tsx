import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { FaEnvelope } from 'react-icons/fa';
import { GiPostStamp } from 'react-icons/gi';

import PointImg from '@/assets/images/point.png';
import ProfileImg from '@/assets/images/profile.png';

import { instance } from '@/api/instance';

import * as S from '@/pages/MyPage/indexStyle';

import Loading from '@/components/Loading/Loading';
import AcceptModal from '@/components/Modal';
import * as MS from '@/components/ModalStyle';

const MyPage = () => {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['myInfo'],
    queryFn: async () => {
      const response = await instance.get('/user/users/myInfo');
      return response.data.data;
    },
  });

  const [isGhost, setIsGhost] = useState(JSON.parse(localStorage.getItem('login-state')!).state.isGhost);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsAcceptModalOpen(true);
  };

  const handleClose = () => {
    setIsAcceptModalOpen(false);
  };

  const handleWithdrawalClick = async () => {
    const loginState = JSON.parse(localStorage.getItem('login-state')!);

    if (isGhost) {
      await instance.put('/user/users/myInfo');
      loginState.state.isGhost = false;
      localStorage.setItem('login-state', JSON.stringify(loginState));
      setIsGhost(false);
    } else {
      await instance.delete('/user/users/myInfo');
      loginState.state.isGhost = true;
      localStorage.setItem('login-state', JSON.stringify(loginState));
      setIsGhost(true);
    }
    handleClose();
  };

  useEffect(() => {
    if (error) {
      console.error('Error fetching my page info:', error);
    }
  }, [error]);

  const navigate = useNavigate();
  const goLogin = () => {
    navigate('/login');
  };

  return isLoading ? (
    <Loading />
  ) : (
    <S.PageContainer>
      <S.BoxContainer>
        <S.BoxText>MY PAGE</S.BoxText>
      </S.BoxContainer>
      <S.ProfileContainer>
        <S.ProfileImgWrapper>
          <S.ProfileImg src={data.profile !== null ? data.profile : ProfileImg} alt={ProfileImg} />
        </S.ProfileImgWrapper>
        <S.NicknameText>{data.nickname}</S.NicknameText>
      </S.ProfileContainer>
      <S.LetterContainer>
        <S.LetterElementContainer>
          <GiPostStamp size={36} color="#9288E0" />
          <S.HighlightText>{data.stampCnt}</S.HighlightText>
          <S.ExplainText>우표</S.ExplainText>
        </S.LetterElementContainer>
        <S.LetterElementContainer>
          <FaEnvelope size={32} color="#E3496D" />
          <S.HighlightText>{data.sendCnt}</S.HighlightText>
          <S.ExplainText>보낸 편지</S.ExplainText>
        </S.LetterElementContainer>
        <S.LetterElementContainer>
          <FaEnvelope size={32} color="#2AC196" />
          <S.HighlightText>{data.recvCnt}</S.HighlightText>
          <S.ExplainText>받은 편지</S.ExplainText>
        </S.LetterElementContainer>
      </S.LetterContainer>
      <S.PointContainer to={'/mypage/point'}>
        <S.PointImg src={PointImg} alt={PointImg} />
        <S.HighlightText>{data.point}</S.HighlightText>
        <S.ExplainText>보유 포인트</S.ExplainText>
      </S.PointContainer>
      <S.OtherContainer onClick={goLogin}>
        <S.OtherBtn $textcolor="#fff">로그아웃</S.OtherBtn>
      </S.OtherContainer>
      <S.Line></S.Line>
      <S.OtherContainer onClick={handleOpen}>
        <S.OtherBtn $textcolor="#fff">{!isGhost ? '회원 탈퇴' : '탈퇴 취소'}</S.OtherBtn>
      </S.OtherContainer>
      <div>{isFetching ? 'Updating...' : ''}</div>
      <AcceptModal isOpen={isAcceptModalOpen} onClose={handleClose}>
        <div>
          {isGhost ? (
            <MS.InnerTextBox style={{ marginBottom: '5rem' }}>
              <MS.InnerText>탈퇴를 철회 하시겠습니까?</MS.InnerText>
            </MS.InnerTextBox>
          ) : (
            <div>
              <MS.InnerTextBox>
                <MS.InnerText>회원을 탈퇴 하시겠습니까?</MS.InnerText>
              </MS.InnerTextBox>
              <MS.InnerSubTextBox>
                <MS.InnerSubText>일주일 안에 철회할 수 있습니다.</MS.InnerSubText>
              </MS.InnerSubTextBox>
            </div>
          )}

          <MS.YesButton onClick={handleWithdrawalClick}>확인</MS.YesButton>
          <MS.NoButton onClick={handleClose}>취소</MS.NoButton>
        </div>
      </AcceptModal>
    </S.PageContainer>
  );
};

export default MyPage;
