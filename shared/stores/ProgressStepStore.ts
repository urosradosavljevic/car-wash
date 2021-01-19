import { observable, action, makeObservable } from "mobx"

import { PROGRESS_STEP } from "../constants/progress";
import { RootStore } from "./RootStore";

export type ProgressStepHydration = {
    current: PROGRESS_STEP;
}
export class ProgressStepStore {
    root: RootStore;

    current: PROGRESS_STEP = PROGRESS_STEP.LOGIN;

    constructor(root: RootStore) {
        this.root = root;
        makeObservable(this, {
            current: observable,
            goToStep: action,
            nextStep: action,
            previousStep: action,
        })
    }

    goToStep = (step: PROGRESS_STEP) => {
        this.current = step;
    }

    nextStep = () => {
        switch (this.current) {
            case PROGRESS_STEP.LOGIN:
                this.current = PROGRESS_STEP.DATE;
                break;
            case PROGRESS_STEP.DATE:
                this.current = PROGRESS_STEP.TREATMENT;
                break;
            case PROGRESS_STEP.TREATMENT:
                this.current = PROGRESS_STEP.TIMELINE;
                break;
            case PROGRESS_STEP.TIMELINE:
                this.current = PROGRESS_STEP.CHECKOUT;
                break;
            default:
                this.current = PROGRESS_STEP.LOGIN;
        }
    }

    previousStep = () => {
        switch (this.current) {
            case PROGRESS_STEP.DATE:
                this.current = PROGRESS_STEP.LOGIN;
                break;
            case PROGRESS_STEP.TREATMENT:
                this.current = PROGRESS_STEP.DATE;
                break;
            case PROGRESS_STEP.TIMELINE:
                this.current = PROGRESS_STEP.TREATMENT;
                break;
            case PROGRESS_STEP.CHECKOUT:
                this.current = PROGRESS_STEP.TIMELINE;
                break;
            default:
                this.current = PROGRESS_STEP.LOGIN;
        }
    }

    hydrate(data?: ProgressStepHydration) {
        if (data) {
            this.current = data.current;
        }
    }
}

