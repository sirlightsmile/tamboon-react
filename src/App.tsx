import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { DonatePage } from "./donate_page";
import { ThemeProvider } from "styled-components";
import GlobalStyle, { mainTheme } from "./globalStyles";
import ErrorBoundary from "./error_boundary";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <ThemeProvider theme={mainTheme}>
        <ErrorBoundary>
          <Suspense fallback={<h1>Loading...</h1>}>
            <DonatePage />
          </Suspense>
        </ErrorBoundary>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;