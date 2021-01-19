import { observable, action, makeObservable } from "mobx"

import { PROGRESS_STEP } from "../constants/progress";
import { RootStore } from "./RootStore";

const initialProgressMap = {
    login: false,
    date: false,
    treatment: false,
    timeline: false,
    checkout: false,
}

type StepMapType = typeof initialProgressMap;

export type UIStoreHydration = {
    isNavOpen: boolean;
    isMobile: boolean;
    progress: StepMapType,
}

export class UIStore {
    root: RootStore;

    progress: StepMapType = initialProgressMap;
    isNavOpen: boolean = false;
    isMobile: boolean = false;

    constructor(root: RootStore) {
        this.root = root;
        makeObservable(this, {
            progress: observable,
            isMobile: observable,
            isNavOpen: observable,
            submitProgressBar: action,
            resetProgressBar: action,
            toggleNav: action,
            setIsMobile: action,
        })
    }

    submitProgressBar = (step: PROGRESS_STEP) => {
        this.progress = {
            ...this.progress,
            [step]: true
        }
    }

    resetProgressBar = () => {
        this.progress = initialProgressMap;
    }

    toggleNav = () => {
        this.isNavOpen = !this.isNavOpen
    }


    setIsMobile = (isMobile: boolean) => {
        this.isMobile = isMobile
    }

    hydrate(data?: UIStoreHydration) {
        if (data) {
            this.isNavOpen = data.isNavOpen;
            this.isMobile = data.isMobile;
            this.progress = data.progress;
        }
    }
}
