import { useStaticRendering } from "mobx-react";

import OrderStore from "./OrderStore";
// import UIStore from './UIStore';

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

let store: { orderStore: OrderStore } | null = null;

export default function initializeStore() {
  if (isServer) {
    return {
      orderStore: new OrderStore(),
    };
  }
  if (store === null) {
    store = {
      orderStore: new OrderStore(),
    };
  }

  return store;
}
