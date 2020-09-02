import React from 'react'
import { BiCalendarAlt } from 'react-icons/bi/';
import { FaHandHoldingHeart, FaUserAlt } from 'react-icons/fa/';
import { GiFlyingFlag } from 'react-icons/gi/';
import { AiOutlineSchedule } from 'react-icons/ai/';
import clsx from 'clsx';

import styles from '../styles/ScheduleProgress.module.scss'

interface Props {
    step: number;
    setStep: (n: number) => void
}

export const ScheduleProgress: React.FC<Props> = ({ step, setStep }) => {

    const renderStyle = (number: number) => clsx(styles.progress__list_item, step === number && styles.progress__list_item_done)

    return (<header className={styles.progress}>
        <div className={styles.progress_container}>
            <h4>Schedule appointement</h4>
            <div className={styles.progress_list}>
                <div role="button" onClick={() => setStep(0)} data-name="Login" className={renderStyle(0)}>
                    <span>
                        <FaUserAlt size="2rem" />
                    </span>
                </div>
                <div role="button" onClick={() => setStep(1)} data-name="Choose Date" className={renderStyle(1)}>
                    <span>
                        <BiCalendarAlt size="2rem" />
                    </span>
                </div>
                <div role="button" onClick={() => setStep(2)} data-name="Choose Treatment" className={renderStyle(2)}>
                    <span>
                        <FaHandHoldingHeart size="2rem" />
                    </span>
                </div>
                <div role="button" onClick={() => setStep(3)} data-name="Pick Time" className={renderStyle(3)}>
                    <span>
                        <AiOutlineSchedule size="2rem" />
                    </span>
                </div>
                <div role="button" onClick={() => setStep(4)} data-name="Finish" className={renderStyle(4)}>
                    <span>
                        <GiFlyingFlag size="2rem" />
                    </span>
                </div>
            </div>
        </div >
    </header >);
}