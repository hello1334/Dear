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

export const StampFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 77%;
`;

export const StampInputContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0.5rem 0;
`;

export const StampTextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

export const StampText = styled.div`
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  & > span {
    color: #f51111;
  }
`;

export const StampImgWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const StampImg = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 3px;
`;

export const StampImgBtn = styled.button`
  width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  border-radius: 3px;
  border: 1px dashed #fff;
  background-color: #33363f;
  align-items: center;
  flex-direction: column;
`;

export const StampImgText = styled.div`
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
`;

export const StampInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: #33363f;
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-size: 14px;
  color: #fff;
  &::placeholder {
    color: #dadada;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const StampInputArea = styled.textarea`
  font-family: 'NotoSansKR-Regular', sans-serif;
  border: none;
  outline: none;
  resize: none;
  width: 100%;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: #33363f;
  font-size: 14px;
  color: #fff;
  height: 10rem;
  &::placeholder {
    color: #dadada;
  }
`;

export const Btn = styled.button`
  text-align: center;
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-size: 16px;
  color: #121212;
  width: 100%;
  height: 55px;
  border-radius: 15px;
  background-color: #fdf3e7;
  margin-top: 2rem;
`;

export const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const ModalHeaderText = styled.div`
  font-size: 18px;
  font-family: 'NotoSansKR-Regular', sans-serif;
`;

export const ModalBodyText = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ModalInnerText = styled.div<{ $textcolor: string }>`
  font-size: 14px;
  font-family: 'NotoSansKR-Regular', sans-serif;
  color: ${(props) => props.$textcolor};
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
