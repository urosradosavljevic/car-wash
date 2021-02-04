import { useState } from 'react'
import { StepsProgress } from '../../models/ProgressSteps';

import { PROGRESS_STEP } from "../types/progress";

const initialStepMap: StepsProgress = {
    login: false,
    date: false,
    treatment: false,
    timeline: false,
    checkout: false,
}

export const useProgressBar = () => {
    const [progress, setProgress] = useState(initialStepMap);

    const submitProgressBar = (step: PROGRESS_STEP) => {
        setProgress(old => ({
            ...old,
            [step]: true
        }))
    }

    const resetProgressBar = () => {
        setProgress(initialStepMap);
    }

    return { progress, submitProgressBar, resetProgressBar }
}