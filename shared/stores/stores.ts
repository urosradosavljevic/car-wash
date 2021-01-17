import { useStaticRendering } from "mobx-react";

import OrderStore from "./OrderStore";
import ProgressStore from "./ProgressStore";
import UIStore from "./UIStore";

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

export default function initializeStores() {
  return {
    orderStore: new OrderStore(),
    uiStore: new UIStore(),
    progressStore: new ProgressStore(),
  };
}
