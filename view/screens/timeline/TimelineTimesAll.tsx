import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';

import treatments from '../../../shared/data/treatments'

import styles from './Timeline.module.scss'
import { Interval } from '../../../models/Inteval'
import { useScheduleStore } from '../../../shared/providers/RootStoreProvider'
import { TimeButtonsList } from './components/TimeButtonsList';
import { parseTimeNumber } from '../../../shared/util/helpers';
import { intervalService } from '../../../services/intervalService';

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

    const selectedTreatmentDuration = (treatments[vehicle][treatment].duration / 60);

    useEffect(() => {
        const inters = intervalService.extractIntervals(selectedDay, businessHours, selectedTreatmentDuration);
        setIntervals(inters)
        console.log("mobile")
    }, [selectedDay, businessHours])


    return (
        <div className={styles.times_container}  >

            <h3>Available times</h3>

            <div>

                {intervals.length > 0 ? intervals.map((interval, idx) => (
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
                )) : <div>Sorry, we currently don't have available termin for selected choice.</div>}

            </div>

        </div>);
})