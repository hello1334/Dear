import styled from 'styled-components';

export const LayoutContainer = styled.div`
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  height: auto;
  overflow-y: auto;
  margin: 0 auto;
  max-width: 420px;
  min-width: 320px;
  background-color: ${({ theme }) => theme.colors.black};
`;
