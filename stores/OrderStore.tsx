import { observable } from "mobx"
import { createContext } from "react";

class OrderStore {
    @observable
    date = new Date();
}

export const OrderStoreContext = createContext(new OrderStore());