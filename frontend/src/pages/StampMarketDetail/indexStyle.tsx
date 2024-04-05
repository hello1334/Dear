import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 60px);
  overflow: hidden;
  padding: 0 ${({ theme }) => theme.pagePadding};
`;

export const BoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const Blank = styled.div`
  width: 5rem;
`;

export const BoxText = styled.div`
  border-radius: 10px;
  font-size: 14px;
  background: #fff;
  padding: 1rem 1.3rem;
  font-family: 'Julius Sans One', sans-serif;
  color: #121212;
`;

export const PointContainer = styled.div`
  display: flex;
  width: 5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const PointImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const PointText = styled.div<{ $textcolor: string; $fontsize: string; $fontweight: string }>`
  font-size: ${(props) => props.$fontsize};
  font-family: 'Julius Sans One', sans-serif;
  font-weight: ${(props) => props.$fontweight};
  color: ${(props) => props.$textcolor};
`;

export const StampContainer = styled.div`
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  height: 75%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StampImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem 0;
`;

export const StampImg = styled.img`
  width: 20rem;
  height: 20rem;
`;

export const StampTitleWrapper = styled.div`
  margin: 1rem 0;
`;

export const StampTitleText = styled.div`
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #fff;
`;
export const StampContentWrapper = styled.div`
  margin: 4rem 3rem;
`;

export const StampContentText = styled.div`
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-size: 16px;
  text-align: center;
  line-height: 1.5;
  color: #fff;
`;

export const Btn = styled.button`
  text-align: center;
  font-size: 16px;
  width: 100%;
  height: 55px;
  color: #121212;
  border-radius: 15px;
  background-color: #fdf3e7;
  font-family: 'NotoSansKR-Regular', sans-serif;
`;

export const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const ModalHeaderText = styled.div`
  font-size: 18px;
  color: red;
  margin-bottom: 1.5rem;
`;

export const ModalBodyText = styled.div`
  font-size: 14px;
  margin-top: 1rem;
`;

export const AnswerStrap = styled.div`
  display: flex;
`;

export const YesButton = styled.button`
  width: 139px;
  height: 50px;
  background-color: rgb(253, 243, 231);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  color: black;
  margin-right: 10px;
`;

export const NoButton = styled.button`
  width: 139px;
  height: 50px;
  background-color: #1d2026;
  border: 1px solid rgb(253, 243, 231);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  color: rgb(253, 243, 231);
  margin-left: 10px;
`;

export const CancelButton = styled.button`
  width: 250px;
  height: 50px;
  background-color: #1d2026;
  border: 1px solid rgb(253, 243, 231);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  color: rgb(253, 243, 231);
`;
