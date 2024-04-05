import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  :root {
       --vh: 100%;
   }
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    height: 100%;  
    font-family: 'Pretendard-Regular', sans-serif;
    font-size: 62.5%; //1rem = 10px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    height: 100%;  
    font-size : 1.6rem;
    line-height: 1.2;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.colors.white};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  li {
    list-style: none;
  }
  button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;

export default GlobalStyles;
