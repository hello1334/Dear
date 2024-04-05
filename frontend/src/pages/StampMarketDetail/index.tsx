import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useQuery, useMutation } from '@tanstack/react-query';

import PointImg from '@/assets/images/point.png';

import { instance } from '@/api/instance';

import * as S from '@/pages/StampMarketDetail/indexStyle';

import Loading from '@/components/Loading/Loading';
import Modal from '@/components/Modal/Modal';

const StampMarketDetail = () => {
  const location = useLocation();
  const stamp = location.state;
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await instance.post('/letter/purchase-stamps', { stampId: stamp.id });
      return response.data.data;
    },
    onSuccess: () => {
      setIsAcceptModalOpen(false);
    },
  });
  const {
    data: dataPoint,
    isLoading: isLoading,
    error: error,
  } = useQuery({
    queryKey: ['point', isAcceptModalOpen],
    queryFn: async () => {
      const response = await instance.get('/user/users/point');
      return response.data.data;
    },
  });

  useEffect(() => {
    if (error) {
      console.error('Error fetching point:', error);
    }
  }, [error]);
  return isLoading ? (
    <Loading />
  ) : (
    <S.PageContainer>
      <S.BoxContainer>
        <S.Blank></S.Blank>
        <S.BoxText>STAMP DETAIL</S.BoxText>
        <S.PointContainer>
          <S.PointImg src={PointImg} alt="PointImg" />
          <S.PointText $textcolor="#fff" $fontsize="14px" $fontweight="500">
            {dataPoint.point}P
          </S.PointText>
        </S.PointContainer>
      </S.BoxContainer>
      <S.StampContainer>
        <S.StampImgWrapper>
          <S.StampImg src={stamp.url} alt={stamp.title} />
        </S.StampImgWrapper>
        <S.StampTitleWrapper>
          <S.StampTitleText>{stamp.title}</S.StampTitleText>
        </S.StampTitleWrapper>
        <S.PointContainer>
          <S.PointImg src={PointImg} alt="PointImg" />
          <S.PointText $textcolor="#ffc066" $fontsize="18px" $fontweight="700">
            {stamp.price}P
          </S.PointText>
        </S.PointContainer>
        <S.StampContentWrapper>
          <S.StampContentText>{stamp.content}</S.StampContentText>
        </S.StampContentWrapper>
      </S.StampContainer>
      <S.Btn onClick={() => setIsAcceptModalOpen(true)}>구매하기</S.Btn>
      <Modal
        title={`구매 하시겠습니까? \n 구매 후 포인트 : ${dataPoint.point - stamp.price}P`}
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
      >
        {dataPoint.point >= stamp.price ? (
          <>
            <S.AnswerStrap>
              <S.YesButton
                onClick={() => {
                  mutation.mutate();
                  navigate('/market');
                }}
              >
                확인
              </S.YesButton>
              <S.NoButton onClick={() => setIsAcceptModalOpen(false)}>취소</S.NoButton>
            </S.AnswerStrap>
          </>
        ) : (
          <>
            <S.ModalHeaderText>포인트가 부족합니다.</S.ModalHeaderText>
            <S.CancelButton onClick={() => setIsAcceptModalOpen(false)}>취소</S.CancelButton>
          </>
        )}
      </Modal>
    </S.PageContainer>
  );
};

export default StampMarketDetail;
