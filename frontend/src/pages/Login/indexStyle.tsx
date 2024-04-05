import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 60px);
  padding: 0 ${({ theme }) => theme.pagePadding};
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 0 0 2rem;
`;

export const EmphasisText = styled.div`
  font-family: 'MontserratBold', sans-serif;
  font-size: 2rem;
  margin-bottom: 0.4rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
`;

export const NormalText = styled.div`
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin-top: 0.75rem;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem 0 0 0;
`;

export const StampImg = styled.img`
  width: 17rem;
  height: 24rem;
`;

export const ExplainTextWraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0 0 0;
`;

export const BlueExplainText = styled.p`
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-size: 1.5rem;
  color: #acccff;
`;

export const WhiteExplainText = styled.p`
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-size: 1.5rem;
  color: #fff;
`;

export const YellowExplainText = styled.p`
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-size: 1.5rem;
  color: #f3f5ba;
`;
