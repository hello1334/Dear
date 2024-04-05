import styled from 'styled-components';

import homelogo from '@/assets/icons/homelogo.svg';

interface LoadingCheckProps {
  $isVisible: boolean;
}

interface ArrowProps {
  $isRight: boolean;
}

export const MainContainer = styled.div`
  height: 100vh;
`;

export const LoadingCheck = styled.div<LoadingCheckProps>`
  position: ${(props) => (props.$isVisible ? 'static' : 'absolute')};
  visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
  left: ${(props) => (props.$isVisible ? '0' : '-10000px')};
  height: 100vh;
`;

export const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AnswerStrap = styled.div`
  display: flex;
`;

export const InputTag = styled.input`
  background: none;
  border: 1px solid rgb(253, 243, 231);
  border-radius: 10px;
  width: 300px;
  height: 45px;
  outline: none;
  color: white;
  text-align: center;
`;

export const YesButton = styled.button`
  width: 300px;
  height: 45px;
  background-color: rgb(253, 243, 231);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  color: black;
  margin-top: 15px;
  transition: transform 0.2s; // 변환 효과 지속 시간

  &:hover {
    transform: scale(1.1); // 마우스 오버 시 버튼 크기 110%로 확대
  }
  &:active {
    transform: scale(0.9); // 클릭 시 버튼 크기를 90%로 축소
  }
`;

export const DuplicationButton = styled.button`
  width: 300px;
  height: 45px;
  background-color: rgb(253, 243, 231);
  border: 1px solid rgb(253, 243, 231);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  color: black;
  margin-top: 15px;
  transition: transform 0.2s; // 변환 효과 지속 시간

  &:hover {
    transform: scale(1.1); // 마우스 오버 시 버튼 크기 110%로 확대
  }
  &:active {
    transform: scale(0.9); // 클릭 시 버튼 크기를 90%로 축소
  }
`;

export const DuplicationPTag = styled.p`
  color: red;
`;

export const PossiblePTag = styled.p``;

export const Logocontainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 269px;
  height: 293px;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  background-image: url(${homelogo});
  background-position: center;
`;
export const ArrowContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0%);
`;

export const ArrowWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background-color: transperent;

  //첫번째요소 style
  & > * {
    margin-top: 6px;
    animation-delay: 0.1s;
  }
`;

export const Arrow = styled.div<ArrowProps>`
  width: 30px;
  height: 30px;
  border-right: 5px solid white;
  border-bottom: 3px solid white;

  transform: rotate(-45deg);
  -webkit-transform: ${(props) => (props.$isRight ? 'rotate(135deg)' : 'rotate(-45deg)')};
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);

  animation: arrow-wave 1s infinite;
  animation-direction: alternate;
  @keyframes arrow-wave {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  animation: arrow-wave 1s infinite;
  animation-direction: alternate;

  //첫번째 요소
`;
