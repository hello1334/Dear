import styled from 'styled-components';

import ButtonIcon from '@/assets/icons/button.svg';
import PushedButtonIcon from '@/assets/icons/pushedbutton.svg';

export const Container = styled.div`
  height: calc(var(--vh, 1vh) * 100 - ${({ theme }) => theme.headerHeight});
  width: 100%;
  padding: 0 20px;
`;
export const LetterImage = styled.div<{ src: string }>`
  width: 100%;
  min-height: 80%;
  margin-top: 50px;
  height: auto;
  background: url(${({ src }) => src}) no-repeat center;
  background-size: contain;
`;

export const DownloadButton = styled.button`
  position: relative;
  top: 20px;
  left: calc(100% - 40px);
  width: 38px;
  height: 38px;
  background-image: url(${ButtonIcon});
  border: none;
  cursor: pointer;
  &:hover {
    background-image: url(${PushedButtonIcon});
  }
  z-index: 99;
`;
