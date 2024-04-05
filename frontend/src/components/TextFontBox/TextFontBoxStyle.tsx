import styled from 'styled-components';

export const TextBox = styled.div<{ $color: string; $isFocus: boolean; $margin: boolean }>`
  border-radius: 10px;
  font-size: 14px;
  min-width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.$isFocus ? `#121212` : props.$color)};
  background-color: ${(props) => (props.$isFocus ? props.$color : 'transparent')};
  border: ${(props) => (props.$isFocus ? 'none' : `1px solid ${props.$color}`)};
  padding: 1rem 1.5rem;
  margin-right: ${(props) => (props.$margin ? '1rem' : '0')};
  letter-spacing: 0.05rem;
  font-family: 'Julius Sans One', sans-serif;
`;
