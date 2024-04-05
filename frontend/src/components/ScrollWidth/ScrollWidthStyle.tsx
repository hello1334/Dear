import styled from 'styled-components';

export const TypeButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 5px;
  width: 60px;
`;
export const ButtonImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
`;
export const TypeButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 1rem 1rem;
  background-color: ${(props) => (props.$isActive ? '#5f6972' : '#33363f')};
  border-radius: 50%;
  cursor: pointer;
`;
export const TypeTitle = styled.span`
  font-size: 1.2rem;
  margin-top: 0.8rem;
`;

export const TypesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const TypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 0 5px;

  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-scrollbar: no-button;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const ArrowButton = styled.button``;
