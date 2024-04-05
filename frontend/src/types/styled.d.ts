import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      //   main: string;
      //   secondary: string;
      //   background: string;
      white: string;
      black: string;
      grey: string;
      blue: string;
    };
    backgroundColor: string;
    border: {
      bottom: string;
    };
    padding: string;
    headerHeight: string;
    pagePadding: string;
    logoSize: string;
  }
}
