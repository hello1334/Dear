import { Outlet } from 'react-router';

import Header from '@/components/Header/Header';

import * as S from './LayoutStyle';
import { LayoutProps } from './LayoutTypes';

const Layout = ({ children, isHeader = true }: LayoutProps) => {
  return (
    <S.LayoutContainer>
      {isHeader && <Header />}
      {children || <Outlet />}
    </S.LayoutContainer>
  );
};

export default Layout;
