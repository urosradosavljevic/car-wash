import { observable, action } from "mobx"

import { UIStoreData } from "../constants/types/store/UIStoreData";

const initial = {
    isNavOpen: false,
}

class UIStore {
    @observable
    isNavOpen!: boolean;

    @action
    toggleNav = () => {
        this.isNavOpen = !this.isNavOpen
    }

    hydrate(initialData: UIStoreData) {
        this.isNavOpen = initialData.isNavOpen;
    }
}

export const getInitialUIState = async () => {

    return initial;
}

export default UIStore;