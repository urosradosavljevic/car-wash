import { NextPage } from "next";
import React from "react";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../shared/styles/custom_datepicker.css";
import "../shared/styles/globals.css";

import { RootStoreProvider } from "../shared/providers/RootStoreProvider";
import { ProgressContextProvider } from "../shared/context/ProgressContext";

type AppType = {
  Component: NextPage,
  pageProps: any,
};

function CustomApp({ Component, pageProps }: AppType) {
  return (
    <ProgressContextProvider>
      <RootStoreProvider hydrationData={pageProps.hydrationData}>
        <Component {...pageProps} />;
    </RootStoreProvider>
    </ProgressContextProvider>
  );
}

export default CustomApp;
