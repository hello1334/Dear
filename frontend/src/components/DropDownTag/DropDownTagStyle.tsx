import styled from 'styled-components';

export const DropdownContainer = styled.div<{ $themeColor?: string }>`
  background: ${({ $themeColor }) => $themeColor || '#2b2b2b'};
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 2.5rem;
`;

export const DropdownHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  background-color: #33363f;
  border-radius: 10px;
  padding: 16px;
  align-items: center;
  cursor: pointer;
`;

export const DropdownListContainer = styled.div`
  border-radius: 10px;
  padding: 16px;
  height: auto;
`;
export const DropdownArrow = styled.span`
  position: absolute;
  right: 16px;
  display: inline-block;
  margin-left: 8px;
  transition: transform 0.3s ease-in-out;
  color: white;
  font-size: 12px;
`;

export const DropdownList = styled.div`
  border: none;
  border-radius: 8px;
  padding: 0;
  margin: 8px 0;
`;

export const Tag = styled.button<{ $isActive: boolean; $color: string }>`
  display: inline-block;
  border-radius: 30px;
  padding: 8px 16px;
  font-size: 14px;
  color: ${({ $isActive, $color }) => ($isActive ? '#33363F' : $color)};
  background-color: ${({ $isActive, $color }) => ($isActive ? $color : 'transparent')};
  border: 1.5px solid ${({ $color }) => $color};
  margin-right: 8px;
  margin-bottom: 8px;
  &:last-child {
    margin-right: 0;
  }
`;

export const Input = styled.input<{ $color?: string }>`
  width: 100%;
  border-radius: 10px;
  background-color: ${({ $color }) => $color};
  text-align: center;
  border: none;
  padding: 12px 20px;
  margin-top: 8px;
  font-size: 14px;
`;
export const ButtonImage = styled.img`
  width: 30px;
  height: 25px;
  margin-right: 10px;
  object-fit: contain;
`;
