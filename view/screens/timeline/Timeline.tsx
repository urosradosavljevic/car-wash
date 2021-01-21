import React, { useState } from 'react'

import { businessHours, day as selectedDay } from "../../../shared/data/days"

import styles from './Timeline.module.scss'
import { Interval } from '../../../models/Inteval'
import { TimelineTimes } from './TimelineTimes';
import { TimelineBackground } from './TimelineBackground'
import { TimelineIntervals } from './TimelineIntervals'

export const Timeline: React.FC = () => {

    const [selectedInterval, setSelectedInterval] = useState<Interval | null>(null)

    return (
        <div className={styles.appointements_wrap}>

            <div className={styles.timeline_container}>

                <TimelineBackground businessHours={businessHours} />

                <TimelineIntervals
                    businessHours={businessHours}
                    selectedDay={selectedDay}
                    selectedInterval={selectedInterval}
                    setSelectedInterval={setSelectedInterval}
                />

            </div>

            <TimelineTimes selectedInterval={selectedInterval} />

        </div>);


}