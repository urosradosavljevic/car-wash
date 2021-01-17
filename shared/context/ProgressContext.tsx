import { createContext, useState } from "react";

import { PROGRESS_STEP } from "../constants/progress";

const initial = {
    current: PROGRESS_STEP.LOGIN,
    nextStep: () => { },
    previousStep: () => { }
}

interface ContextType {
    current: PROGRESS_STEP | (() => void) | undefined;
    nextStep?: PROGRESS_STEP | (() => void) | undefined;
    previousStep?: PROGRESS_STEP | (() => void) | undefined;
}

export const ProgressContext = createContext<ContextType>(initial);

export const ProgressContextProvider: React.FC = ({ children }) => {
    const [current, nextStep, previousStep] = useProgressContext();
    return <ProgressContext.Provider value={{ current, nextStep, previousStep }}>{children}</ProgressContext.Provider>
}

export const useProgressContext = () => {
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

    return [current, nextStep, previousStep]

}
