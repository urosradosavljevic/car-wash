import { observable, action } from "mobx"

import { PROGRESS_STEP } from "../constants/progress";

const initial = {
    current: PROGRESS_STEP.LOGIN
}

class ProgressStore {

    @observable
    current!: PROGRESS_STEP;

    @action
    goToStep = (step: PROGRESS_STEP) => {
        this.current = step;
    }

    @action
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

    @action
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

    hydrate() {
        this.current = PROGRESS_STEP.LOGIN;
    }
}
export const getInitialProgressState = async () => {

    return initial;
}


export default ProgressStore;