import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  padding: 0 ${({ theme }) => theme.pagePadding};
  min-height: calc(var(--vh, 1vh) * 100 - 60px);
  display: flex;
  flex-direction: column;
`;
export const Container = styled.div`
  margin: 0 auto;
`;

export const TextBox = styled.div`
  position: relative;
  /* top: 80%; */
  font-size: 14px;
`;

export const TabsContainer = styled.div`
  display: flex;
  background: none;
  justify-content: center;
  padding: 10px 0;
`;

export const Tab = styled.div<{ color: string; textcolor: string }>`
  flex: 1;
  border: 1px solid;
  border-radius: 15px;
  border-color: rgb(253, 243, 231);
  background: ${(props) => props.color};
  padding: 10px;
  font-family: 'Julius Sans One', sans-serif;
  color: ${(props) => props.textcolor};
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  text-align: center;

  // 활성화된 탭의 스타일
  &.active {
    transition: 0.3s;
  }
`;
