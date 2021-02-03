import React, { useState } from 'react'

import styles from './Timeline.module.scss'
import { Interval } from '../../../models/Inteval'
import { TimelineTimes } from './TimelineTimes';
import { TimelineBackground } from './TimelineBackground'
import { TimelineIntervalsList } from './TimelineIntervalsList'
import { useScheduleStore } from '../../../shared/providers/RootStoreProvider';
import { observer } from 'mobx-react-lite';

export const Timeline: React.FC = observer(() => {

    const { businessHours, selectedDaySchedule: selectedDay } = useScheduleStore();
    const [selectedInterval, setSelectedInterval] = useState<Interval | null>(null)

    return (
        <div className={styles.appointements_wrap}>

            <div className={styles.timeline_container}>

                <TimelineBackground businessHours={businessHours} />

                <TimelineIntervalsList
                    businessHours={businessHours}
                    selectedDay={selectedDay}
                    selectedInterval={selectedInterval}
                    setSelectedInterval={setSelectedInterval}
                />

            </div>

            <TimelineTimes selectedInterval={selectedInterval} />

        </div>);


})