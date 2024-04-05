import styled from 'styled-components';

export const Container = styled.div`
  /* align-items: center; */
  justify-content: center;
  /* background-color: red; */
  height: calc(var(--vh, 1vh) * 100 - ${({ theme }) => theme.headerHeight});
  width: 100%;
  overflow: hidden;
`;

export const TextBox = styled.div`
  margin-top: 5vh;
  width: 100%;
  height: 20px;
  /* background-color: yellow; */
  /* top: 80%; */
  font-size: 14px;
  text-align: center;
  /* z-index: 1; */
`;
