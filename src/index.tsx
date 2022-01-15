import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./router/index";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "./theme";

ReactDOM.render(
  <RecoilRoot>
    <Suspense fallback={null}>
      <BrowserRouter>
        <ChakraProvider theme={customTheme}>
          <MyRoutes></MyRoutes>
        </ChakraProvider>
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>,
  document.getElementById("root")
);
