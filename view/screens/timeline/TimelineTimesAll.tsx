import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';

import treatments from '../../../shared/data/treatments'

import styles from './Timeline.module.scss'
import { Interval } from '../../../models/Inteval'
import { useScheduleStore } from '../../../shared/providers/RootStoreProvider'
import { extractIntervals } from '../../../shared/util/interval';
import { TimeButtonsList } from './components/TimeButtonsList';
import { parseTimeNumber } from '../../../shared/util/helpers';

export const TimelineTimesAll: React.FC = observer(() => {

    const [intervals, setIntervals] = useState<Array<Interval>>([])

    const {
        vehicle,
        businessHours,
        selectedDaySchedule: selectedDay,
        treatment,
        startTime: selectedStartTime,
        setStartTime
    } = useScheduleStore();


    useEffect(() => {
        const inters = extractIntervals(selectedDay);
        setIntervals(inters)
        console.log("mobile")
    }, [selectedDay, businessHours])

    const selectedTreatmentDuration = (treatments[vehicle][treatment].duration / 60);

    return (
        <div className={styles.times_container}  >

            <h3>Available times</h3>

            <div >

                {intervals.map((interval, idx) => (
                    <div key={`interval-times-${idx}`}>
                        <div>
                            {parseTimeNumber(interval.startTime)} -
                                {parseTimeNumber(interval.endTime)}
                        </div>

                        <TimeButtonsList
                            selectedTime={selectedStartTime}
                            treatmentDuration={selectedTreatmentDuration}
                            setStartTime={setStartTime}
                            interval={interval}
                        />
                    </div>
                ))}

            </div>

        </div>);
})