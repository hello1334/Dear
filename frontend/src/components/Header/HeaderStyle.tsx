import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const LogoBox = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.logoSize};
  font-weight: bold;
  text-align: center;
  font-family: 'Miniver';
`;
export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  height: ${({ theme }) => theme.headerHeight};
`;

export const BackButton = styled.button`
  border: none;
  cursor: pointer;
`;

export const HomeButton = styled(Link)`
  border: none;
  cursor: pointer;
`;
