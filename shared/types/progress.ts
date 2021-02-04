export enum PROGRESS_STEP {
    LOGIN = "login", DATE = "date", TREATMENT = "treatment", TIMELINE = "timeline", CHECKOUT = "checkout"
}

export enum PROGRESS_TYPE {
    RESET, CHANGE
}

export type ProgresActions = { type: PROGRESS_TYPE.RESET } | { type: PROGRESS_TYPE.CHANGE; payload: PROGRESS_STEP; }

export interface ProgressState {
    login: boolean;
    date: boolean;
    treatment: boolean;
    timeline: boolean;
    checkout: boolean;
}
