import React from 'react'
import { BiCalendarAlt } from 'react-icons/bi/';
import { FaHandHoldingHeart, FaUserAlt } from 'react-icons/fa/';
import { GiFlyingFlag } from 'react-icons/gi/';
import { AiOutlineSchedule } from 'react-icons/ai/';
import clsx from 'clsx';

import styles from '../styles/steps/ScheduleProgress.module.scss'
import { StepsState, StepTypes } from '../constants/types/Steps';

interface Props {
    steps: StepsState;
    currentStep: string | undefined;
}

export const ScheduleProgress: React.FC<Props> = ({ steps, currentStep }) => {

    const renderStyle = (step: StepTypes) => clsx(
        styles.progress__list_item,
        steps[step] && styles.progress__list_item_done,
        currentStep === step && styles.progress__list_item_current
    )

    return (<header className={styles.progress}>
        <div className={styles.progress_container}>
            <div className={styles.progress_list}>
                <div role="button" data-name="Login" className={renderStyle("login")}>
                    <span>
                        <FaUserAlt size="1.7rem" />
                    </span>
                </div>
                <div role="button" data-name="Choose Date" className={renderStyle("date")}>
                    <span>
                        <BiCalendarAlt size="1.7rem" />
                    </span>
                </div>
                <div role="button" data-name="Choose Treatment" className={renderStyle("treatment")}>
                    <span>
                        <FaHandHoldingHeart size="1.7rem" />
                    </span>
                </div>
                <div role="button" data-name="Pick Time" className={renderStyle("timeline")}>
                    <span>
                        <AiOutlineSchedule size="1.7rem" />
                    </span>
                </div>
                <div role="button" data-name="Finish" className={renderStyle("checkout")}>
                    <span>
                        <GiFlyingFlag size="1.7rem" />
                    </span>
                </div>
            </div>
        </div >
    </header >);
}