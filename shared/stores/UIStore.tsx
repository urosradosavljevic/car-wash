import { observable, action } from "mobx"

import { PROGRESS_STEP } from "../constants/progress";

const initialStepMap = {
    login: false,
    date: false,
    treatment: false,
    timeline: false,
    checkout: false,
}

const initial = {
    isNavOpen: false,
    isMobile: false,
    progress: initialStepMap,
}
class UIStore {

    @observable
    progress!: typeof initialStepMap;

    @observable
    isNavOpen!: boolean;

    @action
    submitProgressBar = (step: PROGRESS_STEP) => {
        this.progress = {
            ...this.progress,
            [step]: true
        }
    }

    @action
    resetProgressBar = () => {
        this.progress = initialStepMap;
    }

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

    hydrate(initialData: typeof initial) {
        this.isNavOpen = initialData.isNavOpen;
        this.isMobile = initialData.isMobile;
        this.progress = initialData.progress;
    }
}

export const getInitialUIState = async () => {
    return initial;
}

export default UIStore;