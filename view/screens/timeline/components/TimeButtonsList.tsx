import React, { useEffect, useState } from 'react';

import styles from '../Timeline.module.scss';
import { Time } from '../../../../models/Time';
import { extractPosibleTimes } from '../../../../shared/util/interval';
import { Interval } from '../../../../models/Inteval';
import { compareTimes } from '../../../../shared/util/helpers';
import { TimeButton } from './TimeButton';

interface Props {
    interval: Interval;
    selectedTime: Time | undefined
    setStartTime: (time: Time) => void;
    treatmentDuration: number;
}

export const TimeButtonsList: React.FC<Props> = ({
    interval,
    selectedTime,
    treatmentDuration,
    setStartTime,
    ...props
}) => {
    const [times, setTimes] = useState<Array<Time>>([])

    useEffect(() => {
        const tims = extractPosibleTimes(interval, treatmentDuration);
        setTimes(tims)
    }, [interval, treatmentDuration])

    return (
        <div className={styles.times_wrap} {...props} >
            {times.map((time, idx) =>
                <TimeButton
                    key={`time-btn-${idx}`}
                    startTime={time}
                    selected={compareTimes(selectedTime, time)}
                    onClick={() => setStartTime(time)}
                />)}
        </div>

    );
}