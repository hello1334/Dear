import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Lottie from 'lottie-react';
import { FaRegEdit } from 'react-icons/fa';
import styled from 'styled-components';

import DearIcon from '@/assets/letter/tag/dear_tag.png';
import ETCIcon from '@/assets/letter/tag/etc_tag.png';
import MemoryIcon from '@/assets/letter/tag/memory_tag.png';
import AngryIcon from '@/assets/letter/type/angry_type.png';
import CloverIcon from '@/assets/letter/type/clover_type.png';
import FriendIcon from '@/assets/letter/type/friend_type.png';
import GiftIcon from '@/assets/letter/type/gift_type.png';
import HappyIcon from '@/assets/letter/type/happy_type.png';
import LoveIcon from '@/assets/letter/type/love_type.png';
import MessageIcon from '@/assets/letter/type/message_type.png';
import PlusIcon from '@/assets/letter/type/plus_type.png';
import RelaxIcon from '@/assets/letter/type/relax_type.png';
import SadIcon from '@/assets/letter/type/sad_type.png';
import loadingLottie from '@/assets/lottie/loading.json';
import useLetterStore from '@/store/letterStore';

import { instance } from '@/api/instance';

import DropDownTag from '@/components/DropDownTag/DropDownTag';
import DynamicInput from '@/components/DynamicInput/DynamicInput';
import EditBox from '@/components/EditBox/EditBox';
import AcceptModal from '@/components/Modal/Modal';
import ScrollWidth from '@/components/ScrollWidth/ScrollWidth';

export const LoadingWrapper = styled.div`
  position: absolute;
`;
export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
import * as S from './indexStyle';

const LetterCreate = () => {
  const navigate = useNavigate();
  const [isFriend, setIsFriend] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { letter, setLetter, letterText, setLetterText } = useLetterStore((state) => ({
    letter: state.letter,
    setLetter: state.setLetter,
    letterText: state.letterText,
    setLetterText: state.setLetterText,
  }));

  useEffect(() => {
    if (letter.dearNickname !== '' && letter.dear !== '') {
      setIsFriend(true);
    }
  }, [letter]);

  const types = [
    { icon: LoveIcon, title: '사랑' },
    { icon: FriendIcon, title: '우정' },
    { icon: MessageIcon, title: '인사' },
    { icon: CloverIcon, title: '감사' },
    { icon: GiftIcon, title: '축하' },
    { icon: PlusIcon, title: '기타' },
  ];

  const emotions = [
    { icon: HappyIcon, title: '행복' },
    { icon: RelaxIcon, title: '평온' },
    { icon: SadIcon, title: '슬픔' },
    { icon: AngryIcon, title: '화남' },
  ];

  useEffect(() => {
    console.log(letter);
  }, [letter]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('login-state')!).state;
    setLetter({ from: user.nickname });
  }, [setLetter]);

  const createLetterTextStart = () => {
    const letterData = {
      background: letter.background,
      emotion: letter.emotion,
      characteristics: letter.characteristics,
      memories: letter.memories,
      options: letter.options,
    };
    console.log('letterData:', letterData);
    setIsLoading(true);
    instance
      .post(`/letter/letters/template`, letterData)
      .then((response) => {
        if (response) {
          console.log('Data:', response.data.data.content);
          setLetterText(response.data.data.content);
        }
      })
      .catch((error) => {
        console.error('error', error);
        toast.error('편지 생성에 실패했습니다.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const createLetterText = () => {
    console.log('편지 생성하기');
    if (letter.background === '' || letter.emotion === '' || letter.dear === '' || letter.from === '') {
      toast.error('모든 항목을 입력해주세요.');
      return;
    } else {
      createLetterTextStart();
    }
  };

  const checkDearFriend = () => {
    if (isFriend === null) {
      setIsModalOpen(true);
    }
  };
  const dearItem = {
    icon: DearIcon,
    color: '#F2E6E6',
    title: '수신인 특성',
    tag: ['착한', '귀여운', '용감한', '따뜻한'],
  };
  const memoryItem = { icon: MemoryIcon, color: '#ACCCFF', title: '추억', tag: ['생일', '결혼', '연말'] };
  const etcItem = { icon: ETCIcon, color: '#E1DEF3', title: '기타', tag: ['존댓말', '신년', '존경'] };

  const Loader = () => (
    <Container>
      <LoadingWrapper>
        <Lottie animationData={loadingLottie} loop autoPlay />
      </LoadingWrapper>
    </Container>
  );
  return (
    <S.LetterCreateContainer>
      <S.DearWrapper>
        <DynamicInput
          data={letter.dearNickname}
          onClick={checkDearFriend}
          setData={setLetter}
          title={'DEAR'}
          color={'white'}
          buttonType={true}
        />
        <DynamicInput data={letter.from} setData={setLetter} title={'FROM'} color={'white'} buttonType={false} />
      </S.DearWrapper>
      <S.SelectWrapper>
        <S.TagTitle>어떤 편지를 쓰고 있나요?</S.TagTitle>
        <ScrollWidth name={'background'} data={letter} setData={setLetter} items={types}></ScrollWidth>
      </S.SelectWrapper>
      <S.SelectWrapper>
        <S.TagTitle>어떤 감정을 담고 싶나요?</S.TagTitle>
        <ScrollWidth name={'emotion'} data={letter} setData={setLetter} items={emotions}></ScrollWidth>
      </S.SelectWrapper>
      <DropDownTag name={'characteristics'} data={letter} setData={setLetter} items={dearItem} />
      <DropDownTag name={'memories'} data={letter} setData={setLetter} items={memoryItem} />
      <DropDownTag name={'options'} data={letter} setData={setLetter} items={etcItem} />
      <S.Button onClick={createLetterText}>편지 생성하기</S.Button>
      {letterText && (
        <>
          <EditBox editStatus={false} text={letterText} setText={setLetterText}></EditBox>
          <S.EditContainer>
            <S.EditButtonsWrapper>
              <S.EditButton $type={false}>
                <S.EditWrapper onClick={createLetterText}>
                  <FaRegEdit /> 편지 재생성
                </S.EditWrapper>
              </S.EditButton>
              <S.EditButton
                $type={true}
                onClick={() => {
                  navigate('/letter/deco');
                }}
              >
                다음으로
              </S.EditButton>
            </S.EditButtonsWrapper>
          </S.EditContainer>
        </>
      )}
      {isModalOpen && (
        <AcceptModal
          title={'수신인을 친구 목록에서 \n 선택하시겠습니까?'}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <S.AnswerStrap>
            <S.YesButton
              onClick={() => {
                setIsFriend(true);
                navigate('/friend/letter');
              }}
            >
              예
            </S.YesButton>
            <S.NoButton
              onClick={() => {
                setIsFriend(false);
                setIsModalOpen(false);
              }}
            >
              아니오
            </S.NoButton>
          </S.AnswerStrap>
        </AcceptModal>
      )}
      {isLoading && <Loader />}
    </S.LetterCreateContainer>
  );
};

export default LetterCreate;
