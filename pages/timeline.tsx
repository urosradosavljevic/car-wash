import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import { set } from 'date-fns'
import styles from '../styles/TimelinePage.module.scss'

import OrderStore from '../stores/OrderStore';
import { Timeline } from '../components/Timeline';

interface Props {
    orderStore: OrderStore;
}

const now = new Date()
const getTodayAtSpecificHour = (hour = 12) =>
    set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })
const getTodayAtSpecificTime = (hour = 12, minutes = 0) =>
    set(now, { hours: hour, minutes: minutes, seconds: 0, milliseconds: 0 })

const selectedStart = getTodayAtSpecificHour(5)
const selectedEnd = getTodayAtSpecificHour(14)

const startTime = getTodayAtSpecificHour(8)
const endTime = getTodayAtSpecificHour(20)

const disabledIntervals = [
    { start: getTodayAtSpecificHour(16), end: getTodayAtSpecificHour(17) },
    { start: getTodayAtSpecificHour(10), end: getTodayAtSpecificHour(12) },
    { start: getTodayAtSpecificHour(19), end: getTodayAtSpecificHour(20) }
]


const TimelinePage: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {

    const [selectedInterval, setSelectedInterval] = useState<Array<Date>>([selectedStart, selectedEnd])
    console.log("[selectedStart, selectedEnd]", [selectedStart, selectedEnd]);


    const onChangeCallback: (selectedInterval: Array<Date>) => void = selectedInterval => {
        console.log("selectedInterval", selectedInterval);

        setSelectedInterval(selectedInterval)
    }

    const errorHandler = ({ error }) => console.log({ error })


    return (
        <div className={styles.timeline}>
            <Timeline />
            {/* <TimeRange
                // error={error}
                ticksNumber={36}
                selectedInterval={selectedInterval}
                timelineInterval={[startTime, endTime]}
                onUpdateCallback={errorHandler}
                onChangeCallback={onChangeCallback}
                disabledIntervals={disabledIntervals}
            /> */}
        </div>
    );
}))


export default TimelinePage;