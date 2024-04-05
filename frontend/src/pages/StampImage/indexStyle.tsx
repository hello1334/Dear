import { Link } from 'react-router-dom';

import styled from 'styled-components';
export const PageContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 60px);
  overflow: hidden;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-flow: wrap;
`;

export const StampImgWrapper = styled(Link)`
  width: 8rem;
  height: 8rem;
`;

export const StampImg = styled.img`
  width: 8rem;
  height: 8rem;
`;
