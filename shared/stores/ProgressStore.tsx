import { observable, action } from "mobx"

import { PROGRESS } from "../constants/progress";

const initial = {
    current: PROGRESS.LOGIN
}

class ProgressStore {
    @observable
    current!: PROGRESS;

    @action
    nextStep = () => {
        switch (this.current) {
            case PROGRESS.LOGIN:
                this.current = PROGRESS.DATE;
                break;
            case PROGRESS.DATE:
                this.current = PROGRESS.TREATMENT;
                break;
            case PROGRESS.TREATMENT:
                this.current = PROGRESS.TIMELINE;
                break;
            case PROGRESS.TIMELINE:
                this.current = PROGRESS.CHECKOUT;
                break;
            default:
                this.current = PROGRESS.LOGIN;
        }
    }

    hydrate() {
        this.current = PROGRESS.LOGIN;
    }
}
export const getInitialProgressState = async () => {

    return initial;
}


export default ProgressStore;