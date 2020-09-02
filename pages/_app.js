import App from "next/app";
import React from "react";
import { Provider } from "mobx-react";

import OrderStore, { getInitialStoreState } from "../stores/OrderStore";
import initializeStores from "../stores/stores";
import "../styles/custom_datepicker.css";
import "../styles/globals.css";

class CustomApp extends App {
  state = {
    ...initializeStores(),
  };

  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    const initialMobxState = await getInitialStoreState();

    return {
      ...appProps,
      initialMobxState,
    };
  }

  static getDerivedStateFromProps(props, state) {
    state.orderStore.hydrate(props.initialMobxState);
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
