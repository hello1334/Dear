// EnvelopeLetterStyle.tsx
import { Link } from 'react-router-dom';

import styled from 'styled-components';

interface PaperProps {
  $src: string;
}

export const Linkletter = styled(Link)`
  position: absolute;
  z-index: 1;
  width: 350px;
  height: 229px;
`;
export const Paper = styled.div<PaperProps>`
  position: absolute;
  width: 350px;
  height: 229px;
  z-index: 1;
  transition: transform 0.7s ease;
  background-image: url(${(props) => props.$src});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Envelopefront = styled.img`
  width: 360px;
  height: auto;
  z-index: 2;
`;

export const Envelopeback = styled.img`
  position: absolute;
  width: 360px;
  height: auto;
  z-index: 0;
`;

export const Mail = styled.div`
  margin-top: 10vh;
  height: 362.78px;
  width: auto;
  /* background-color: pink; */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover ${Paper} {
    transform: translateY(-120px);
  }
`;

export const TextDear = styled.div`
  position: absolute;
  top: 60px;
  left: 40px;
  font-size: 14px;
  font-weight: semi-bold;
  color: #000;
`;

export const TextFrom = styled.div`
  position: absolute;
  top: 130px;
  left: 130px;
  font-size: 14px;
  font-weight: semi-bold;
  color: #000;
`;

export const Time = styled.div`
  position: absolute;
  top: 150px;
  left: 100px;
  font-size: 12px;
  font-weight: regular;
  color: #1d2026;
`;

export const InnerImage = styled.img`
  position: relative;
  width: 130px;
  height: 130px;
  z-index: 1;
  top: -30px;
  right: -80px;
`;
