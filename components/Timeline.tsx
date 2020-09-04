import React, { useState } from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'

import styles from '../styles/steps/Timeline.module.scss'
import { businessHours, day } from "../data"
import OrderStore from '../stores/OrderStore'
import { timelineHeight } from '../constants/style'
import { Time } from '../constants/types/Time'
import vehicles from '../constants/vehicles'
import clsx from 'clsx'

interface Props {
    orderStore?: OrderStore;
}

interface Interval {
    index: number;
    startTime: number;
    endTime: number;
}

export const Timeline: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {
    const appointementStore = orderStore!
    const pixelsPerHour = Math.floor(timelineHeight / (businessHours.closed - businessHours.open))
    const duration = (vehicles[appointementStore.vehicle][appointementStore.treatment].duration / 60);

    const [selectedInterval, setSelectedInterval] = useState<Interval | null>(null)

    const [todayOccupied, setTodayOccupied] = useState(day)

    // const fillSlogan = () => [...Array(30)].map((_, index) => (
    //     <p key={index}>OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED</p>
    // ))

    const hoursInterval = (treatment: any) => (treatment.start.hour + (treatment.start.minutes / 60))

    const numberToTime = (number: number) => ({ hour: Math.floor(number), minutes: (number - Math.floor(number)) * 60 })

    const timeToString = (t: Time) => `${t.hour}:${t.minutes === 0 ? "00" : t.minutes}`;

    const selectStartTime = (startTime: Time) => (appointementStore.setStartTime(startTime))

    const buttonClicked = (startTime: number, endTime: number, index: number) => {
        setSelectedInterval({ index, startTime, endTime });
    }

    const compareTimes = (time1: Time, time2: Time) => {
        if (time1 && time2) {
            if (time1.hour === time2.hour && time1.minutes === time2.minutes) return true;
            return false;
        }
    }

    // Insert appointement 
    // const buttonClicked = (startTime: number, endTime: number) => {
    //     setSelectedInterval(`You selected interval from : ${startTime}, to: ${endTime}`)
    //     let startH = Math.floor(startTime)
    //     let startM = Math.ceil((startTime - startH) * 60)

    //     // TODO: Check if treatment can fit  
    //     if (appointementStore.treatment !== null) {
    //         const temp = { treatment: appointementStore.treatment, start: { hour: startH, minutes: startM > 60 ? 0 : startM } }
    //         console.log("new appointement", temp);
    //         const newTreatments = [...todayOccupied, temp]
    //         console.log("newTreatments", newTreatments);
    //         newTreatments.sort((a, b) => {
    //             if (hoursInterval(a) > hoursInterval(b)) {
    //                 return 1;
    //             }
    //             if (hoursInterval(b) > hoursInterval(a)) {
    //                 return -1;
    //             }
    //             return 0;
    //         })
    //         console.log("newTreatments", newTreatments);
    //         // TODO: ovde stadoh
    //         setTodayOccupied(newTreatments)
    //         console.log(todayOccupied);
    //     }
    // }
    const getPosibleTimes = (interval: Interval) => {
        const lenght = interval.endTime - interval.startTime;
        let count = Math.floor(lenght / duration)
        let times = []
        let i = 0;
        while (count !== i) {
            const startTime = numberToTime(interval.startTime + i * duration)
            times.push(
                <div role="button"
                    onClick={() => selectStartTime(startTime)}
                    className={clsx(styles.time__btn, compareTimes(appointementStore.startTime!, startTime) && styles.time_selected)}
                >
                    <span>
                        {startTime.hour}:{startTime.minutes === 0 ? "00" : startTime.minutes}
                    </span>
                </div>
            );
            i++;
        }
        return times;
    }

    const createAddButton = (top: number, bottom: number, startTime: number, endTime: number, index: number) => {
        top = Math.floor(top)
        const height = Math.floor(bottom - top)

        // Don't show intervals shorter than 15min ~ 17px
        if (height < pixelsPerHour / 4) return null

        return (
            <div
                role="button" data-index={index}
                onClick={() => buttonClicked(startTime, endTime, index)}
                style={{ top, height }}
                className={clsx(styles.timeline__add, index === selectedInterval?.index && styles.selected)}
            />)
    }

    const createAddButtons = () => {
        let buttonLastIndex = 0

        let startsFromBeginning = false;
        let firstAppointmentTime = hoursInterval(todayOccupied[0])
        let freeIntervalStart = firstAppointmentTime
        let freeIntervalEnd: number = businessHours.closed;

        if (firstAppointmentTime !== businessHours.open) {
            startsFromBeginning = true;
            freeIntervalStart = businessHours.open
        }

        let formerIntervalEnd: number = startsFromBeginning ? businessHours.open : firstAppointmentTime + (todayOccupied[0].treatment.duration / 60)


        let addButtons = todayOccupied.map((appointement: any) => {
            const appointementStartTime = (appointement.start.hour + appointement.start.minutes / 60)
            const appointementEndTime = (appointement.start.hour + appointement.start.minutes / 60) + duration

            if (startsFromBeginning) {
                freeIntervalStart = formerIntervalEnd
                freeIntervalEnd = appointementStartTime
            } else {
                freeIntervalStart = formerIntervalEnd
                freeIntervalEnd = appointementStartTime
            }

            const top = (freeIntervalStart - businessHours.open) * pixelsPerHour
            const bottom = (freeIntervalEnd - businessHours.open) * pixelsPerHour

            formerIntervalEnd = appointementEndTime

            const btn = createAddButton(top, bottom, freeIntervalStart, freeIntervalEnd, buttonLastIndex)

            buttonLastIndex++;
            return btn
        })

        const top = (formerIntervalEnd - businessHours.open) * pixelsPerHour
        const bottom = (businessHours.closed - businessHours.open) * pixelsPerHour

        const btn = createAddButton(top, bottom, formerIntervalEnd - businessHours.open, businessHours.closed - businessHours.open, buttonLastIndex)
        buttonLastIndex++;
        addButtons.push(btn)
        return addButtons
    };

    return (
        <div className={styles.appointements_wrap}>
            <div className={styles.timeline_container}>
                <div className={styles.timeline__time} >
                    {[...Array(businessHours.closed - businessHours.open)].map((_, index) =>
                        <div key={index} className={styles.timeline__hour}>
                            <span>
                                {businessHours.open + index}:00
                    </span>
                        </div>)}
                </div>
                <div className={styles.timeline__background_wrap}>
                    {/* <div className={styles.timeline__background}>{fillSlogan()}</div>*/}
                </div>
                <div className={styles.timeline__add_wrap}>
                    {createAddButtons()}
                </div>
            </div>
            <div className={styles.times_container}>
                <h3>Available times for period</h3>
                {selectedInterval &&
                    <div>{timeToString(numberToTime(selectedInterval?.startTime))} - {timeToString(numberToTime(selectedInterval?.endTime))}</div>}
                {selectedInterval !== null ?
                    <div className={styles.times_wrap}>
                        {getPosibleTimes(selectedInterval!)}
                    </div> :
                    <div style={{ marginTop: "3rem" }}>	&lt;-- Select Specific Period</div>}
            </div>
        </div>);


}))
