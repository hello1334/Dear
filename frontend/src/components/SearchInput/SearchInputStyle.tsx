import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.5rem;
  border-radius: 10px;
  background-color: #33363f;
  margin: 1.5rem 0;
  gap: 0.5rem;
`;
export const SearchBtn = styled.button`
  flex: 1;
  height: 100%;
  display: flex;
  padding: 1rem 0.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  &:hover {
    background-color: #444851;
  }
`;
export const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #33363f;
  font-size: 14px;
  color: #fff;
  height: 100%;
  flex: 7;
  &::placeholder {
    color: #fff;
    font-size: 95%;
  }
`;
