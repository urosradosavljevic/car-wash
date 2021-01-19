import React, { FC } from 'react'
import styles from './ScheduleStep.module.scss'

import { PROGRESS_STEP } from '../../shared/constants/progress'
import { useProgressContext } from '../../shared/context/ProgressContext';
import { useUIStore } from '../../shared/providers/RootStoreProvider';
import { observer } from 'mobx-react-lite';

interface NavProps {
    onNextStep?: () => void;
    backButton?: boolean
}

const NavButton: FC<NavProps> = observer(({ onNextStep, backButton = false, ...props }) => {
    const uiStore = useUIStore();

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

    const onClick = () => backButton ? previousStep() : stepForward();

    return (
        <button
            {...props}
            className={styles.step__nav_btn}
            onClick={onClick}
        >{backButton ? "Go back" : "Continue"}</button>
    )
});


interface StepProps {
    label: PROGRESS_STEP;
    backButton?: boolean;
}

export const ScheduleStep: FC<StepProps> = ({ label, backButton = false, children }) => {

    const { current } = useProgressContext();

    return (
        current === label ?
            <>
                {children}
                <div data-label={label} className={styles.step__nav}>
                    {backButton && <NavButton backButton={true} />}
                    <NavButton />
                </div>
            </> :
            null
    )
}