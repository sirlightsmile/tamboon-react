import { createGlobalStyle } from 'styled-components';
import FontURL from '../fonts/Quicksand-SemiBold.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'QuicksandSemiBold';
    src: url(${FontURL}) format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: auto;
  }
  html {
    font-family: "QuicksandSemiBold";
    font-weight: bold;
    font-style: normal;
    text-align: center;
  }
`;

export const mainTheme = {
  primaryColor: '#B3E5FC',
  secondaryColor: '#0277BD',
  buttonColor: '#055894',
  activeButtonColor: '#051094',
  popupFontColor: '#fB9B50',
};

export default GlobalStyle;
