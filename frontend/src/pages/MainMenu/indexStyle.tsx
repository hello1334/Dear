// indexStyle.js
import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const MenuWrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100 - ${({ theme }) => theme.headerHeight});
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
  padding: 16px;
  padding-bottom: 50px;
  color: #fff;
`;

export const MenuItem = styled(Link)`
  background: #1d2026;
  color: #fff;
  padding: 16px 32px 14px;
  margin: 4px 0;
  border-radius: 10px;
  display: flex;
  /* align-items: left; */
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #444;
  }
`;

export const TopMenuItem = styled(MenuItem)`
  grid-column: span 2;
`;

export const Icon = styled.img`
  margin-top: 10px;
  align-self: flex-start;
`;

export const TopIcon = styled(Icon)`
  width: 80px;
  height: 80px;
  align-self: flex-end;
`;

export const Label = styled.div`
  font-size: 22px;
  text-align: left;
  margin-bottom: 8px;
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
`;

export const SmallLabel = styled.div`
  font-size: 12px;
  text-align: left;
  margin-bottom: 8px;
`;

export const NewTag = styled.div`
  background: red;
  width: 40px;
  color: white;
  padding: 2px;
  position: relative;
  text-align: center;
  top: -25px;
  right: -105px;
  font-size: 12px;
  border-radius: 5px;
`;
