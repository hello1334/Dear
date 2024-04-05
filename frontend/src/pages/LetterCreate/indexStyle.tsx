import styled from 'styled-components';

export const LetterCreateContainer = styled.div`
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100 - 60px);
  padding: 0 ${({ theme }) => theme.pagePadding};
`;

export const DearWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0 2rem 0;
`;
export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

export const TagTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 500;
`;
export const AnswerStrap = styled.div`
  display: flex;
  width: 100%;
`;

export const YesButton = styled.button`
  width: 50%;
  height: 50px;
  background-color: rgb(253, 243, 231);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  color: black;
  margin-right: 10px;
`;

export const NoButton = styled.button`
  width: 50%;
  height: 50px;
  background-color: transparent;
  border: 1px solid rgb(253, 243, 231);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  color: rgb(253, 243, 231);
  margin-left: 10px;
`;

export const Button = styled.button`
  width: 100%;
  height: 5rem;
  background-color: #fdf3e7;
  font-size: 1.8rem;
  border: none;
  border-radius: 10px;
  color: #121212;
  cursor: pointer;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;
export const EditWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;
export const EditButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 3rem;
`;

export const EditButton = styled.button<{ $type: boolean }>`
  min-width: 150px;
  width: 45%;
  padding: 1.5rem 2rem;
  background-color: ${({ $type }) => ($type ? '#fdf3e7' : 'transparent')};
  font-size: 1.65rem;
  color: ${({ $type }) => ($type ? 'black' : '#fdf3e7')};
  border: ${({ $type }) => ($type ? 'none' : '1px solid #fdf3e7')};
  border-radius: 10px;
  cursor: pointer;
`;

export const ModalTitle = styled.p`
  font-size: 18px;
  margin: 30px 0;
`;
