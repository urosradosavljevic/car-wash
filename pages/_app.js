import App from "next/app";
import React from "react";
import { Provider } from "mobx-react";

import { getInitialOrderState } from "../stores/OrderStore";
import { getInitialUIState } from "../stores/UIStore";
import initializeStores from "../stores/stores";

import "../styles/steps/custom_datepicker.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../styles/globals.css";

class CustomApp extends App {
  state = {
    ...initializeStores(),
  };

  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    const initialOrderState = await getInitialOrderState();
    const initialUIState = await getInitialUIState();

    return {
      ...appProps,
      initialOrderState,
      initialUIState,
    };
  }

  static getDerivedStateFromProps(props, state) {
    state.orderStore.hydrate(props.initialOrderState);
    state.uiStore.hydrate(props.initialUIState);

    return state;
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider {...this.state}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default CustomApp;
