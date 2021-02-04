import React, { FC } from 'react'
import styles from './ScheduleStep.module.scss'

import { PROGRESS_STEP } from '../../shared/types/progress'
import { useProgressContext } from '../../shared/context/ProgressContext';
import { ScheduleNavButton } from './ScheduleNavButton';
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
                    {backButton && <ScheduleNavButton backButton={true} />}
                    <ScheduleNavButton />
                </div>
            </> :
            null
    )
}