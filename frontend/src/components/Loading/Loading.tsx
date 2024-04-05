import Lottie from 'react-lottie';

import styled from 'styled-components';

import animationData from './paperplane_yellow.json';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 60px);
  /* background-color: #f0f0f0; // 배경색, 필요에 따라 수정 */
`;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Loading = () => {
  return (
    <LoadingContainer>
      <Lottie options={defaultOptions} height={400} width={400} />
    </LoadingContainer>
  );
};

export default Loading;
