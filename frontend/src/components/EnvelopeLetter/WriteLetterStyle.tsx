import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const ButtonWrapper = styled.button`
  width: 100%;
  height: 5rem;
  background-color: #fdf3e7;
  font-size: 1.8rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const Button = styled(Link)`
  position: absolute;
  left: 0;
  bottom: 30px;
  width: calc(100% - 40px);
  height: 5rem;
  margin: 1.5rem 20px;
  background-color: rgb(253, 243, 231);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;

  & > svg {
    margin-right: 7px;
  }
`;
