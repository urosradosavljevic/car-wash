import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import clsx from 'clsx'

import { numberToTime, compareTimes, timeToString, parseTimeNumber } from '../../../shared/util/helpers'
import treatments from '../../../shared/data/treatments'

import styles from './Timeline.module.scss'
import { Interval } from '../../../models/Inteval'
import { useScheduleStore } from '../../../shared/providers/RootStoreProvider'
import { extractIntervals } from '../../../shared/util/interval';

export const TimelineMobile: React.FC = observer(() => {
    const { vehicle, businessHours, selectedDaySchedule: selectedDay, treatment, setStartTime } = useScheduleStore();
    const [intervals, setIntervals] = useState<Array<Interval>>([])

    useEffect(() => {
        const inters = extractIntervals(selectedDay);
        setIntervals(inters)
    }, [selectedDay, businessHours])

    const selectedTreatmentDuration = (treatments[vehicle][treatment].duration / 60);

    // adds posible treatments for inteval based on treatment duration
    const getPosibleTimes = (interval: Interval) => {


        const intervalLenght = interval.endTime - interval.startTime;

        let intervalCount = Math.floor(intervalLenght / selectedTreatmentDuration)
        let posibleTimes = [], i = 0;

        if (intervalCount < 0) return null
        while (intervalCount !== i) {
            const startTime = numberToTime(interval.startTime + i * selectedTreatmentDuration)

            const btnClassNames = clsx(
                styles.time__btn,
                compareTimes(startTime!, startTime) && styles.time_selected
            );

            posibleTimes.push(
                <div
                    role="button"
                    key={`time-${intervalCount}`}
                    onClick={() => setStartTime(startTime)}
                    className={btnClassNames}
                >
                    <span>
                        {timeToString(startTime)}
                    </span>
                </div>
            );
            i++;
        }
        return posibleTimes;
    }


    return (
        <div className={styles.appointements_wrap}>

            <div className={styles.times_container}>

                <h3>Available times</h3>
                <div className={styles.mobile__times_wrap}>

                    {intervals.map(i => <div>
                        <div
                            key={`time-${i}`}
                        >
                            {parseTimeNumber(i.startTime)} - {parseTimeNumber(i.endTime)}</div>
                        <div className={styles.times_wrap}>
                            {getPosibleTimes(i)}
                        </div>
                    </div>)}

                </div>

            </div>

        </div>);


})