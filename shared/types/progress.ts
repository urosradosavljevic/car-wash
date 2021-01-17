import { PROGRESS_STEP } from "../constants/progress";

export interface ProgressState {
    login: boolean;
    date: boolean;
    treatment: boolean;
    timeline: boolean;
    checkout: boolean;
    currentStep: PROGRESS_STEP;
}
