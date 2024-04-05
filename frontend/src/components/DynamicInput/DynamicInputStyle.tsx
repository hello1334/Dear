import styled from 'styled-components';

export const DearWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;
export const ButtonWrapper = styled.div<{ $buttonType: boolean; $color: string }>`
  background-color: ${({ $buttonType, $color }) => ($buttonType ? $color : 'transparent')};
  border: ${({ $buttonType, $color }) => ($buttonType ? 'none' : `1px solid ${$color}`)};
  display: flex;
  margin-right: 1rem;
  border-radius: 10px;
  padding: 1rem 2rem;
`;

export const DynamicTitle = styled.button<{ $buttonType: boolean; $color: string }>`
  margin-right: 6px;
  padding-top: 1px;
  line-height: 1;
  font-family: 'Julius Sans One', sans-serif;
  color: ${({ $buttonType, $color }) => ($buttonType ? 'black' : $color)};
`;
export const DynamicSpace = styled.span`
  visibility: hidden;
  position: absolute;
`;

export const DynamicInput = styled.input<{ $fontWidth: number; $buttonType: boolean; $color: string }>`
  width: ${({ $fontWidth }) => $fontWidth}px;
  background-color: transparent;
  color: ${({ $buttonType, $color }) => ($buttonType ? 'black' : $color)};
  outline: none;
  border: none;
`;
