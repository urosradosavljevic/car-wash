import { useStaticRendering } from "mobx-react";

import OrderStore from "./OrderStore";
// import UIStore from './UIStore';

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

let store: { orderStore: OrderStore } | null = null;

export default function initializeStore(initialData = { date: new Date() }) {
  if (isServer) {
    return {
      orderStore: new OrderStore(initialData),
    };
  }
  if (store === null) {
    store = {
      orderStore: new OrderStore(initialData),
    };
  }

  return store;
}
