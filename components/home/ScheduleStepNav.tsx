import React, { FC } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './ScheduleStep.module.scss'

import { PROGRESS_STEP } from '../../shared/constants/progress'
import { useProgressContext } from '../../shared/context/ProgressContext';
import UIStore from '../../shared/stores/UIStore';

interface NavProps {
    onNextStep?: () => void;
    backButton?: boolean
    uiStore?: UIStore;
}

const NavButton: FC<NavProps> = inject("uiStore")(observer(({ uiStore, onNextStep, backButton = false, ...props }) => {
    const ui = uiStore!

    const { current, nextStep, previousStep } = useProgressContext();

    const stepForward = () => {
        current === PROGRESS_STEP.CHECKOUT && submitTreatment();
        ui.submitProgressBar(current);
        nextStep();
    }

    const submitTreatment = () => {
        let success = true; // submit treatment to api

        if (success) {
            ui.resetProgressBar();
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
}));


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