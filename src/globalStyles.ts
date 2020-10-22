import { createGlobalStyle } from "styled-components";
import FontURL from "./fonts/Quicksand-SemiBold.ttf";

export const theme = {
  primaryBlue: "#0794B4",
  primaryWhite: "#fff",
};

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
  primaryColor: "#B3E5FC",
  secondaryColor: "#0277BD",
  buttonColor: "#055894",
  activeButtonColor: "#051094",
  popupFontColor: "#fad099",
};

export default GlobalStyle;
