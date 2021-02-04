import React, { FC, } from 'react'
import styles from './ScheduleStep.module.scss'

import { PROGRESS_STEP } from '../../shared/types/progress'
import { useProgressContext } from '../../shared/context/ProgressContext';
import { useScheduleStore, useUIStore } from '../../shared/providers/RootStoreProvider';
import { observer } from 'mobx-react-lite';

interface NavProps {
    onNextStep?: () => void;
    backButton?: boolean
}

export const ScheduleNavButton: FC<NavProps> = observer(({ onNextStep, backButton = false, ...props }) => {
    const uiStore = useUIStore();
    const { startTime } = useScheduleStore();
    const { current, nextStep, previousStep } = useProgressContext();

    const stepForward = () => {
        current === PROGRESS_STEP.CHECKOUT && submitTreatment();
        uiStore.submitProgressBar(current);
        nextStep();
    }

    const submitTreatment = () => {
        let success = true; // submit treatment to api

        if (success) {
            uiStore.resetProgressBar();
            alert("Don't be late");
        }
    }

    const onClick = () => {
        if (backButton) {
            previousStep()
        } else if (current === PROGRESS_STEP.TIMELINE && !startTime) {
            alert("You have to select appointement time to continue!")
        } else {
            stepForward()
        }
    }

    return (
        <button
            {...props}
            className={styles.step__nav_btn}
            onClick={onClick}
        >{backButton ? "Go back" : "Continue"}</button>
    )
});
