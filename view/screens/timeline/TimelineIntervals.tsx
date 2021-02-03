import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

import styles from './Timeline.module.scss'
import { Appointement } from '../../../models/Appointement';
import { timelineHeight } from '../../../shared/style'
import { Interval } from '../../../models/Inteval';
import { BusinessHours } from '../../../models/Time';
import { extractIntervals } from '../../../shared/util/interval';
import { IntervalButton } from './IntervalButton';

interface Props {
    businessHours: BusinessHours;
    selectedDay: Array<Appointement>;
    selectedInterval: Interval | null;
    setSelectedInterval: (interval: Interval) => void;
}

export const TimelineIntervals: React.FC<Props> = ({
    selectedDay,
    businessHours,
    setSelectedInterval,
    selectedInterval
}) => {
    const [intervals, setIntervals] = useState<Array<Interval>>([])
    const [pixelsPerHour, setPixelsPerHour] = useState<number>(17)

    useEffect(() => {
        const inters = extractIntervals(selectedDay);
        setIntervals(inters)
    }, [selectedDay, businessHours])

    useEffect(() => {
        // calculate pixels per hour based on timeline height
        setPixelsPerHour((old) => {
            if (old !== pixelsPerHour) {
                return Math.floor(timelineHeight / (businessHours.closed - businessHours.open))
            } else {
                return old;
            }
        })
    }, [timelineHeight, businessHours])

    return (
        <div className={styles.timeline__add_wrap}>
            {intervals.map((interval, index) => {

                // calculate button dimensions
                const topPosition = Math.floor(interval.startTime * pixelsPerHour)

                const height = Math.floor(interval.endTime * pixelsPerHour - topPosition)

                // Don't show intervals shorter than 15min
                if (height < pixelsPerHour / 4) return null

                const intervalClassNames = clsx(
                    styles.timeline__add,
                    index === selectedInterval?.index && styles.selected
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