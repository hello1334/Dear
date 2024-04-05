import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const PageContainer = styled.div`
  height: calc(var(--vh, 1vh) * 100 - ${({ theme }) => theme.headerHeight});
  padding-right: 20px;
  padding-left: 20px;
  position: relative;
  width: 100%;
  overflow: hidden;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 20px 0;
  font-size: 1.9rem;
  text-align: left;
  background-color: #33363f;
  color: white;
  border-radius: 20px;
  text-indent: 20px;
`;

export const TabsContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  background: none;
  margin-right: 25px;
  margin-left: 55px;
`;

export const Tab = styled.button<{ color: string; $textcolor: string }>`
  flex-grow: 1;
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid transparent;
  border-radius: 15px;
  border-color: #e6e6e9;
  background: #000000;
  color: white;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: 'Julius Sans One', sans-serif;
  font-size: 14px;
  cursor: pointer;

  // 활성화된 탭의 스타일
  &.active {
    transition: 0.3s;
    border-color: white;
    background: ${(props) => props.color};
    color: ${(props) => `#${props.$textcolor}`};
  }
`;

export const SliderContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: black;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 10px;
  margin: 20px;
`;

export const GridItem = styled.div<{ rowSpan: number; colSpan: number }>`
  grid-row-end: span ${(props) => props.rowSpan};
  grid-column-end: span ${(props) => props.colSpan};
`;

export const GoMailLink = styled(Link)``;

export const StyledImage = styled.img`
  width: 100%;
  min-width: 30px;
  max-width: 150px;
  height: auto;
  max-height: 150px;
  min-height: 30px;
  object-fit: cover;
`;
