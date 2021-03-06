import { createContext, useContext, useState } from "react";

import { PROGRESS_STEP } from "../types/progress";

const initial = {
    current: PROGRESS_STEP.LOGIN,
    nextStep: () => { },
    previousStep: () => { }
}

export const ProgressContext = createContext(initial);

export const ProgressContextProvider: React.FC = ({ children }) => {
    const { current, nextStep, previousStep } = useProgressReducer();
    return <ProgressContext.Provider value={{ current, nextStep, previousStep }}>{children}</ProgressContext.Provider>
}

export const useProgressContext = () => useContext(ProgressContext);

export const useProgressReducer = () => {
    const [current, setCurrent] = useState<PROGRESS_STEP>(PROGRESS_STEP.LOGIN);

    const nextStep = () => {
        switch (current) {
            case PROGRESS_STEP.LOGIN:
                setCurrent(PROGRESS_STEP.DATE);
                break;
            case PROGRESS_STEP.DATE:
                setCurrent(PROGRESS_STEP.TREATMENT);
                break;
            case PROGRESS_STEP.TREATMENT:
                setCurrent(PROGRESS_STEP.TIMELINE);
                break;
            case PROGRESS_STEP.TIMELINE:
                setCurrent(PROGRESS_STEP.CHECKOUT);
                break;
            case PROGRESS_STEP.CHECKOUT:
                setCurrent(PROGRESS_STEP.LOGIN);
                break;
            default:
                setCurrent(PROGRESS_STEP.LOGIN);
        }
    }

    const previousStep = () => {
        switch (current) {
            case PROGRESS_STEP.DATE:
                setCurrent(PROGRESS_STEP.LOGIN);
                break;
            case PROGRESS_STEP.TREATMENT:
                setCurrent(PROGRESS_STEP.DATE);
                break;
            case PROGRESS_STEP.TIMELINE:
                setCurrent(PROGRESS_STEP.TREATMENT);
                break;
            case PROGRESS_STEP.CHECKOUT:
                setCurrent(PROGRESS_STEP.TIMELINE);
                break;
            default:
                setCurrent(PROGRESS_STEP.LOGIN);
        }
    }

    return { current, nextStep, previousStep }

}
