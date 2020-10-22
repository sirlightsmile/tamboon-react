import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { DonatePage } from "./donate_page";
import { ThemeProvider } from "styled-components";
import GlobalStyle, { mainTheme } from "./globalStyles";
import ErrorBoundary from "./error_boundary";
import Loading from "./gadgets/loading";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <ThemeProvider theme={mainTheme}>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <DonatePage />
          </Suspense>
        </ErrorBoundary>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
