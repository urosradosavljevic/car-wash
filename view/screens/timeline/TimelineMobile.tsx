import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';

import treatments from '../../../shared/data/treatments'

import styles from './Timeline.module.scss'
import { Interval } from '../../../models/Inteval'
import { useScheduleStore } from '../../../shared/providers/RootStoreProvider'
import { extractIntervals } from '../../../shared/util/interval';
import { TimeButtonsList } from './TimeButtonsList';

export const TimelineMobile: React.FC = observer(() => {
    const {
        vehicle,
        businessHours,
        selectedDaySchedule: selectedDay,
        treatment,
        startTime: selectedStartTime,
        setStartTime
    } = useScheduleStore();

    const [intervals, setIntervals] = useState<Array<Interval>>([])

    useEffect(() => {
        const inters = extractIntervals(selectedDay);
        setIntervals(inters)
    }, [selectedDay, businessHours])

    const selectedTreatmentDuration = (treatments[vehicle][treatment].duration / 60);

    return (
        <div className={styles.appointements_wrap}>

            <div className={styles.times_container}>

                <h3>Available times</h3>
                <div className={styles.mobile__times_wrap}>

                    {intervals.map(interval => (
                        <TimeButtonsList
                            selectedTime={selectedStartTime}
                            treatmentDuration={selectedTreatmentDuration}
                            setStartTime={setStartTime}
                            interval={interval}
                        />
                    ))}

                </div>

            </div>

        </div>);
})