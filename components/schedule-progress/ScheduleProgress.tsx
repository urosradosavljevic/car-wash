import React from 'react'
import { observer } from 'mobx-react-lite';

import { BiCalendarAlt } from 'react-icons/bi/';
import { FaHandHoldingHeart, FaUserAlt } from 'react-icons/fa/';
import { GiFlyingFlag } from 'react-icons/gi/';
import { AiOutlineSchedule } from 'react-icons/ai/';
import clsx from 'clsx';

import styles from './ScheduleProgress.module.scss'
import { PROGRESS_STEP } from '../../shared/types/progress';
import { useUIStore } from '../../shared/providers/RootStoreProvider';

interface Props {
    currentStep: PROGRESS_STEP;
}

export const ScheduleProgress: React.FC<Props> = observer(({ currentStep }) => {
    const uiStore = useUIStore();

    const renderStyle = (step: PROGRESS_STEP) => clsx(
        styles.progress__list_item,
        uiStore.progress[step] && styles.progress__list_item_done,
        currentStep === step && styles.progress__list_item_current
    );

    return (
        <header className={styles.progress}>
            <div className={styles.progress_container}>

                <div className={styles.progress_list}>
                    <div data-name="Login" className={renderStyle(PROGRESS_STEP.LOGIN)}>
                        <span>
                            <FaUserAlt size="1.7rem" />
                        </span>
                    </div>

                    <div data-name="Choose Date" className={renderStyle(PROGRESS_STEP.DATE)}>
                        <span>
                            <BiCalendarAlt size="1.7rem" />
                        </span>
                    </div>

                    <div data-name="Choose Treatment" className={renderStyle(PROGRESS_STEP.TREATMENT)}>
                        <span>
                            <FaHandHoldingHeart size="1.7rem" />
                        </span>
                    </div>

                    <div data-name="Pick Time" className={renderStyle(PROGRESS_STEP.TIMELINE)}>
                        <span>
                            <AiOutlineSchedule size="1.7rem" />
                        </span>
                    </div>

                    <div data-name="Finish" className={renderStyle(PROGRESS_STEP.CHECKOUT)}>
                        <span>
                            <GiFlyingFlag size="1.7rem" />
                        </span>
                    </div>

                </div>
            </div >
        </header >
    );
})