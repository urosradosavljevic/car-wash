import React, { useState } from 'react'

import styles from './Timeline.module.scss'
import { Interval } from '../../../models/Inteval'
import { TimelineTimes } from './TimelineTimes';
import { TimelineBackground } from './components/TimelineBackground'
import { TimelineIntervalsList } from './TimelineIntervalsList'
import { useScheduleStore, useUIStore } from '../../../shared/providers/RootStoreProvider';
import { observer } from 'mobx-react-lite';
import { TimelineTimesAll } from './TimelineTimesAll';

const Timeline: React.FC = observer(() => {

    const uiStore = useUIStore();

    const { businessHours, selectedDaySchedule: selectedDay } = useScheduleStore();
    const [selectedInterval, setSelectedInterval] = useState<Interval | null>(null)

    return (
        <div className={styles.appointements_wrap}>

            {!uiStore.isMobile &&
                <div className={styles.timeline_container}>

                    <TimelineBackground businessHours={businessHours} />

                    <TimelineIntervalsList
                        businessHours={businessHours}
                        selectedDay={selectedDay}
                        selectedInterval={selectedInterval}
                        setSelectedInterval={setSelectedInterval}
                    />

                </div>
            }

            {uiStore.isMobile ?
                <TimelineTimesAll /> :
                <TimelineTimes selectedInterval={selectedInterval} />}

        </div>);



})

export default Timeline;