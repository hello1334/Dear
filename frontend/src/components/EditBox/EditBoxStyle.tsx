import styled from 'styled-components';

export const EditBoxContainer = styled.div`
  background: #33363f;
  width: 100%;
  border-radius: 10px;
  padding: 16px;
  line-height: 1.5;
  height: auto;
  margin-bottom: 2rem;
`;

export const EditButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 40px;
`;
export const EditTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const EditTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;
export const EditTextWrapper = styled.div`
  padding: 10px 20px;
`;
export const EditTextBox = styled.textarea`
  width: 100%;
  height: auto;
  color: white;
  background-color: transparent;
  line-height: 1.5;
  border: none;
  resize: none;
  font-family: 'Noto Sans KR', sans-serif;
  &:focus {
    outline: none;
  }
`;
