import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 60px);
  overflow: hidden;
  padding: 0;
`;

export const PointHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 5rem 0;
  gap: 2rem;
`;

export const PointsImg = styled.img`
  width: 12rem;
  height: 12rem;
`;

export const PointText = styled.div`
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #c1e3e1;
`;

export const PointExplainText = styled.div`
  font-size: 14px;
  font-family: 'NotoSansKR-Regular', sans-serif;
  color: #fff;
`;

export const PointBodyContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 3.5rem;
  gap: 3.5rem;
  border-radius: 30px 30px 0 0;
  background-color: #1d2026;
`;

export const DateText = styled.div`
  font-size: 14px;
  font-family: 'NotoSansKR-Regular', sans-serif;
  color: #fff;
`;

export const HistoryContainer = styled.div`
  overflow-y: scroll;
  height: calc(var(--vh, 1vh) * 100 - 500px);
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 3.5rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DetailContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
`;

export const PointContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderText = styled.div<{ $textcolor: string }>`
  font-size: 16px;
  font-family: 'NotoSansKR-Regular', sans-serif;
  color: ${(props) => props.$textcolor};
`;

export const FooterText = styled.div`
  font-size: 12px;
  font-family: 'NotoSansKR-Regular', sans-serif;
  color: #595959;
`;
