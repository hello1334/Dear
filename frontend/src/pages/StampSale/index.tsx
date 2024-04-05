import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useQuery, useMutation } from '@tanstack/react-query';
import { HiOutlinePlusSm } from 'react-icons/hi';

import { instance } from '@/api/instance';

import * as S from '@/pages/StampSale/indexStyle';

import Loading from '@/components/Loading/Loading';
import Modal from '@/components/Modal/Modal';

const StampSale = () => {
  interface SellStamp {
    stampId: number;
    price: number;
    title: string;
    content: string;
  }
  const navigate = useNavigate();
  const location = useLocation();
  const stamp = location.state;
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<SellStamp>({
    stampId: stamp === null ? -1 : stamp.id,
    price: 0,
    title: '',
    content: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'stampId' || name === 'price' ? parseInt(value, 10) : value,
    });
  };

  const handleOnClickImg = () => {
    navigate('/market/sale/image', { replace: true });
  };

  const handleOnClick = () => {
    if (formData.stampId === -1) {
      toast.error('판매할 우표를 선택해주세요.');
      return;
    }
    if (isNaN(formData.price)) {
      toast.error('가격을 입력해주세요.');
      return;
    }
    if (formData.price < 100 || formData.price > 10000) {
      toast.error('100P이상 10000P이하로 입력해주세요.');
      return;
    }
    if (formData.title === '') {
      toast.error('우표 제목을 입력해주세요.');
      return;
    }
    if (formData.title.length > 10) {
      toast.error('우표 제목을 10자 내로 입력해주세요.');
      return;
    }
    if (formData.content === '') {
      toast.error('우표 설명을 입력해주세요.');
      return;
    }
    if (formData.content.length > 50) {
      toast.error('우표 제목을 10자 내로 입력해주세요.');
      return;
    }
    setIsAcceptModalOpen(true);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await instance.post('/letter/sell-stamps', formData);
      return response.data.data;
    },
    onSuccess: () => {
      setIsAcceptModalOpen(false);
      navigate('/market', { replace: true });
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
        <S.BoxText>SALE STAMP</S.BoxText>
      </S.BoxContainer>
      <S.StampFormContainer>
        <S.StampInputContainer>
          <S.StampTextWrapper>
            <S.StampText>
              🎨 판매하실 우표를 선택해주세요. <span>*</span>
            </S.StampText>
          </S.StampTextWrapper>
          <S.StampImgWrapper>
            {formData.stampId !== -1 && <S.StampImg src={stamp.url} alt={stamp.id}></S.StampImg>}
            <S.StampImgBtn onClick={handleOnClickImg}>
              <HiOutlinePlusSm color="#fff" size={18} />
              <S.StampImgText>우표 선택</S.StampImgText>
            </S.StampImgBtn>
          </S.StampImgWrapper>
        </S.StampInputContainer>
        <S.StampInputContainer>
          <S.StampTextWrapper>
            <S.StampText>
              💰 우표 가격을 입력해주세요. <span>*</span>
            </S.StampText>
          </S.StampTextWrapper>
          <S.StampInput
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="300"
          />
        </S.StampInputContainer>
        <S.StampInputContainer>
          <S.StampTextWrapper>
            <S.StampText>
              🔖 우표 제목을 입력해주세요. <span>*</span>
            </S.StampText>
          </S.StampTextWrapper>
          <S.StampInput
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="타임스퀘어"
          />
        </S.StampInputContainer>
        <S.StampInputContainer>
          <S.StampTextWrapper>
            <S.StampText>
              📝 우표 설명을 입력해주세요. <span>*</span>
            </S.StampText>
          </S.StampTextWrapper>
          <S.StampInputArea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="이 우표는 엘렌과 루카의 사랑을 기념하는 뉴욕의 한 조각입니다. 받는 이에게 따뜻한 추억을 선사합니다."
          />
        </S.StampInputContainer>
      </S.StampFormContainer>
      <S.Btn onClick={handleOnClick}>판매하기</S.Btn>
      <Modal title={'판매하시겠습니까?'} isOpen={isAcceptModalOpen} onClose={() => setIsAcceptModalOpen(false)}>
        {dataPoint.point >= Math.round(formData.price * 0.3) ? (
          <>
            <S.ModalBodyText>
              <S.ModalInnerText $textcolor="#C1E3E1">포인트 가격의 30%가 차감됩니다.</S.ModalInnerText>
              <S.ModalInnerText $textcolor="#fff">
                판매 후 포인트 : {dataPoint.point - Math.round(formData.price * 0.3)}P
              </S.ModalInnerText>
            </S.ModalBodyText>
            <S.AnswerStrap>
              <S.YesButton onClick={() => mutation.mutate()}>확인</S.YesButton>
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

export default StampSale;
