import React, { useState } from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'

import styles from '../styles/Timeline.module.scss'
import { businessHours, day } from "../data"
import OrderStore from '../stores/OrderStore'
import { timelineHeight } from '../constants/style'
import { Time } from '../constants/types/Time'
import vehicles from '../constants/vehicles'

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

    const fillSlogan = () => [...Array(30)].map((_, index) => (
        <p key={index}>OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED</p>
    ))

    const hoursInterval = (treatment: any) => (treatment.start.hour + (treatment.start.minutes / 60))

    const numberToTime = (number: number) => ({ hour: Math.floor(number), minutes: (number - Math.floor(number)) * 60 })

    const selectStartTime = (startTime: Time) => (appointementStore.setStartTime(startTime))

    const buttonClicked = (startTime: number, endTime: number, index: number) => {
        setSelectedInterval({ index, startTime, endTime });
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

    const createAddButton = (top: number, bottom: number, startTime: number, endTime: number, index: number) => {
        top = Math.floor(top)
        const height = Math.floor(bottom - top)

        // Don't show intervals shorter than 15min ~ 17px
        if (height < pixelsPerHour / 4) return null

        return (
            <div
                role="button" data-index={index}
                onClick={() => buttonClicked(startTime, endTime, index)}
                style={{ top, height }} className={styles.timeline__add}
            >
                <span>Select Interval {index === selectedInterval?.index && "*"}</span>
            </div>)
    }

    const getPosibleTimes = (interval: Interval) => {
        const lenght = interval.endTime - interval.startTime;
        let count = Math.floor(lenght / duration)
        let times = []
        let i = 0;
        while (count !== i) {
            const startTime = numberToTime(interval.startTime + i * duration)
            times.push(
                <div role="button" onClick={() => selectStartTime(startTime)}>
                    {startTime.hour}:{startTime.minutes}
                </div>
            );
            i++;
        }
        return times;
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

    return (<div className={styles.appointements_wrap}>
        <span>{appointementStore.startTime?.hour}-{appointementStore.startTime?.minutes}</span>
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
                <div className={styles.timeline__background} >{fillSlogan()}</div>
            </div>
            <div className={styles.timeline__add_wrap}>
                {createAddButtons()}
            </div>
        </div>
        <div>
            <div>{selectedInterval?.startTime}  -  {selectedInterval?.endTime}</div>
            <h3>Available termins</h3>
            {selectedInterval !== null && getPosibleTimes(selectedInterval!)}
        </div>
    </div>);


}))
