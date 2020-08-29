
import App from "next/app";
import React from "react";
import { Provider } from "mobx-react";
import OrderStore from "../stores/OrderStore";
import initializeStore from "../stores/stores";
import "../styles/custom_datepicker.css"
import "../styles/globals.css"

class CustomApp extends App {
  state = {
    orderStore: new OrderStore()
  };

  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    const initialMobxState = await initializeStore();

    return {
      ...appProps,
      initialMobxState
    };
  }

  // Hydrate serialized state to store
  static getDerivedStateFromProps(props, state) {
    state.orderStore = initializeStore(props.initialMobxState);

    return state;
  }

  render() {
    const { Component, pageProps } = this.props;
    console.log("pageProps", pageProps);

    return (
      <Provider {...this.state}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default CustomApp;