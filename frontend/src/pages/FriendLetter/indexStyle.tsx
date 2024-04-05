import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 ${({ theme }) => theme.pagePadding};
  height: calc(var(--vh, 1vh) * 100 - 60px);
`;

export const TextBox = styled.div`
  position: relative;
  /* top: 80%; */
  font-size: 14px;
`;

export const TabsContainer = styled.div`
  display: flex;
  background: none;
  padding: 10px;
  justify-content: center;
`;

export const Tab = styled.div<{ $color: string; $textcolor: string }>`
  width: 107px;
  border: 1px solid;
  border-radius: 15px;
  border-color: rgb(253, 243, 231);
  background: ${(props) => props.$color};
  padding: 10px;
  font-family: 'Julius Sans One', sans-serif;
  color: ${(props) => props.$textcolor};
  margin-right: 10px;
  cursor: pointer;
  text-align: center;
`;
