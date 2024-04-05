import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import Router from '@/routes/index';
import GlobalFonts from '@/styles/GlobalFonts';
import GlobalStyles from '@/styles/GlobalStyle';
import theme from '@/styles/theme';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const queryClient = new QueryClient(); //캐시와 훅을 쓸수있게 정의
  function setScreenSize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalFonts />
          <GlobalStyles />
          <Router />
          <ToastContainer position="top-center" limit={1} closeButton={true} autoClose={4000} hideProgressBar />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
