import React, { useState } from 'react'

import styles from './Timeline.module.scss'
import { Interval } from '../../../models/Inteval'
import { TimelineTimes } from './TimelineTimes';
import { TimelineBackground } from './components/TimelineBackground'
import { TimelineIntervalsList } from './TimelineIntervalsList'
import { useScheduleStore, useUIStore } from '../../../shared/providers/RootStoreProvider';
import { observer } from 'mobx-react-lite';
import { TimelineTimesAll } from './TimelineTimesAll';
import treatments from '../../../shared/data/treatments';
import { intervalService } from '../../../services/intervalService';

const Timeline: React.FC = observer(() => {

    const uiStore = useUIStore();

    const { businessHours, selectedDaySchedule: selectedDay, startTime, vehicle, treatment } = useScheduleStore();

    const initial = intervalService.exportIntervalFromTime(startTime, businessHours, selectedDay)
    const [selectedInterval, setSelectedInterval] = useState<Interval | null>(initial)

    const selectedTreatmentDuration = (treatments[vehicle][treatment].duration / 60);
    return (
        <div className={styles.appointements_wrap}>

            {!uiStore.isMobile &&
                <div className={styles.timeline_container}>

                    <TimelineBackground businessHours={businessHours} />

                    <TimelineIntervalsList
                        businessHours={businessHours}
                        treatmentDuration={selectedTreatmentDuration}
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