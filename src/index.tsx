import React from "react";
import { render } from "react-dom";
import { RecoilRoot } from "recoil";
import { DonatePage } from "./donate_page";
import { ThemeProvider } from "styled-components";
import GlobalStyle, { mainTheme } from "./globalStyles";

render(
  <RecoilRoot>
    <GlobalStyle />
    <ThemeProvider theme={mainTheme}>
      <DonatePage />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
