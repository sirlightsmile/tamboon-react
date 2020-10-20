import React from "react";
import { render } from "react-dom";
import { RecoilRoot } from "recoil";
import { DonatePage } from "./donate_page";

render(
  <RecoilRoot>
    <DonatePage />
  </RecoilRoot>,
  document.getElementById("root")
);
