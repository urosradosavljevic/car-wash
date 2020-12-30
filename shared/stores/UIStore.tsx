import { observable, action } from "mobx"

import { UIStoreData } from "../../models/store/UIStoreData";

const initial = {
    isNavOpen: false,
    isMobile: false,
}

class UIStore {
    @observable
    isNavOpen!: boolean;

    @action
    toggleNav = () => {
        this.isNavOpen = !this.isNavOpen
    }
    @observable
    isMobile!: boolean;

    @action
    setIsMobile = (isMobile: boolean) => {
        this.isMobile = isMobile
    }

    hydrate(initialData: UIStoreData) {
        this.isNavOpen = initialData.isNavOpen;
        this.isMobile = initialData.isMobile;
    }
}

export const getInitialUIState = async () => {

    return initial;
}

export default UIStore;