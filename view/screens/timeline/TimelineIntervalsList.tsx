import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

import styles from './Timeline.module.scss'
import { Appointement } from '../../../models/Appointement';
import { timelineHeight } from '../../../shared/constants/style'
import { Interval } from '../../../models/Inteval';
import { BusinessHours } from '../../../models/Time';
import { intervalService } from '../../../services/intervalService';
import { IntervalButton } from './components/IntervalButton';

interface Props {
    businessHours: BusinessHours;
    selectedDay: Array<Appointement>;
    selectedInterval: Interval | null;
    treatmentDuration: number,
    setSelectedInterval: (interval: Interval) => void;
}

export const TimelineIntervalsList: React.FC<Props> = ({
    selectedDay,
    businessHours,
    treatmentDuration,
    setSelectedInterval,
    selectedInterval
}) => {
    const [intervals, setIntervals] = useState<Array<Interval>>([])
    const [pixelsPerHour, setPixelsPerHour] = useState<number>(17)

    const { open, closed } = businessHours

    useEffect(() => {
        const inters = intervalService.extractIntervals(selectedDay, businessHours, treatmentDuration);
        setIntervals(inters)
    }, [selectedDay, businessHours])

    useEffect(() => {
        // calculate pixels per hour based on timeline height
        setPixelsPerHour(Math.floor(timelineHeight / (closed - open)))
    }, [timelineHeight, businessHours])

    return (
        <div className={styles.timeline__add_wrap}>
            {intervals.map((interval, index) => {
                const { startTime, endTime } = interval

                // calculate button dimensions
                const topPosition = Math.floor((startTime - open) * pixelsPerHour)

                const height = Math.floor(((endTime - open) * pixelsPerHour) - topPosition)

                // Don't show intervals shorter than 15min
                if (height < pixelsPerHour / 4) return null

                const intervalSelected = intervalService.compareIntervals(interval, selectedInterval)

                const intervalClassNames = clsx(
                    styles.timeline__add,
                    intervalSelected && styles.selected
                )

                return (<IntervalButton
                    key={`interval-btn-${index}`}
                    top={topPosition}
                    height={height}
                    onClick={() => setSelectedInterval(interval)}
                    className={intervalClassNames}
                />)
            })}
        </div>
    );
}