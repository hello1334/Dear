import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100 - 60px);
  padding: 0 ${({ theme }) => theme.pagePadding};
`;

export const LetterCanvas = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
`;
export const EditorToolBarContainer = styled.div`
  display: flex;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  flex-direction: column;
`;
export const Tag = styled.button<{ $isActive: boolean }>`
  display: inline-block;
  border-radius: 30px;
  padding: 8px 16px;
  font-size: 14px;
  color: ${({ $isActive }) => ($isActive ? '#33363F' : '#FDF3E7')};
  background-color: ${({ $isActive }) => ($isActive ? '#FDF3E7' : 'transparent')};
  border: 1px solid #fdf3e7;
  margin-right: 10px;
  margin-bottom: 8px;
  &:last-child {
    margin-right: 0;
  }
`;
export const Button = styled.button`
  width: 100%;
  color: #121212;
  height: 5rem;
  background-color: #fdf3e7;
  font-size: 1.8rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;
export const ToolBarButtonContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;
