import React from 'react'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite';

import styles from './Timeline.module.scss'
import { compareTimes, numberToTime, timeToString } from '../../../shared/util/helpers';
import { Interval } from '../../../models/Inteval';
import { useScheduleStore } from '../../../shared/providers/RootStoreProvider';
import treatments from '../../../shared/data/treatments';

interface Props {
    selectedInterval: Interval | null;
}

export const TimelineTimes: React.FC<Props> = observer(({ selectedInterval }) => {

    const { vehicle, treatment, startTime: appStartTime, setStartTime } = useScheduleStore();

    const selectedTreatmentDuration = (treatments[vehicle][treatment].duration / 60);

    // adds posible treatments for inteval based on treatment duration
    const getPosibleTimes = (interval: Interval) => {

        const intervalLenght = interval.endTime - interval.startTime;

        let intervalCount = Math.floor(intervalLenght / selectedTreatmentDuration)
        let posibleTimes = [], i = 0;

        if (intervalCount < 0) return null;

        while (intervalCount !== i) {
            const startTime = numberToTime(interval.startTime + i * selectedTreatmentDuration)

            const btnClassNames = clsx(
                styles.time__btn,
                compareTimes(appStartTime!, startTime) && styles.time_selected
            );

            posibleTimes.push(
                <div
                    role="button"
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
        <div className={styles.times_container}>

            <h3>Available times for period</h3>

            {selectedInterval &&
                <div>
                    {timeToString(numberToTime(selectedInterval?.startTime))} - {timeToString(numberToTime(selectedInterval?.endTime))}
                </div>
            }

            {selectedInterval !== null ?
                <div className={styles.times_wrap}>
                    {getPosibleTimes(selectedInterval!)}
                </div> :
                <div style={{ marginTop: "3rem" }}>
                    {`<--  Select Desired Period`}
                </div>
            }

        </div>
    );
})