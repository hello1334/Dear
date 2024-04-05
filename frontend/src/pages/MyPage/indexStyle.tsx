import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 60px);
  overflow: hidden;
  padding: 0 ${({ theme }) => theme.pagePadding};
`;

export const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BoxText = styled.div`
  border-radius: 10px;
  font-size: 14px;
  background: #fff;
  padding: 1rem 1.3rem;
  font-family: 'Julius Sans One', sans-serif;
  color: #121212;
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 3rem 0;
  gap: 1rem;
`;

export const ProfileImgWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileImg = styled.img`
  width: 10.5rem;
  height: 10.5rem;
`;

export const NicknameText = styled.button`
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
`;

export const LetterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const LetterElementContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

export const PointContainer = styled(Link)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #1d2026;
  border-radius: 10px;
  padding: 2rem 0;
  margin: 2rem 0;
  gap: 0.2rem;
`;

export const PointImg = styled.img`
  width: 4rem;
  height: 4rem;
`;

export const HighlightText = styled.div`
  font-size: 20px;
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-weight: 700;
  color: #fff;
`;

export const ExplainText = styled.div`
  font-size: 12px;
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-weight: 500;
  color: #6f6f6f;
`;

export const OtherContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #1d2026;
  border-radius: 10px;
`;

export const OtherBtn = styled.button<{ $textcolor: string }>`
  text-align: center;
  font-size: 14px;
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-weight: 500;
  color: ${(props) => props.$textcolor};
  padding: 2rem 0;
`;

export const Line = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #121212;
`;
