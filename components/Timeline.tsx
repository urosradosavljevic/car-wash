import React, { useState } from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import clsx from 'clsx'

import { numberToTime, compareTimes, appointementToHours, timeToString } from '../util/helpers'
import { businessHours, day as selectedDay } from "../data"
import OrderStore from '../stores/OrderStore'
import { timelineHeight } from '../constants/style'
import { Time } from '../constants/types/Time'
import treatments from '../constants/treatments'

import styles from '../styles/steps/Timeline.module.scss'
import UIStore from '../stores/UIStore'
import { Appointement } from '../constants/types/Appointement'
import { Interval } from '../constants/types/Inteval'

interface Props {
    orderStore?: OrderStore;
    uiStore?: UIStore;
}


export const Timeline: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {
    const appointementStore = orderStore!
    const pixelsPerHour = Math.floor(timelineHeight / (businessHours.closed - businessHours.open))
    const selectedTreatmentDuration = (treatments[appointementStore.vehicle][appointementStore.treatment].duration / 60);

    const [selectedInterval, setSelectedInterval] = useState<Interval | null>(null)

    // const fillSlogan = () => [...Array(30)].map((_, index) => (
    //     <p key={index}>OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED</p>
    // ))

    const selectStartTime = (startTime: Time) =>
        appointementStore.setStartTime(startTime);

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
    //         setTodayOccupied(newTreatments)
    //         console.log(todayOccupied);
    //     }
    // }
    const getPosibleTimes = (interval: Interval) => {
        const intervalLenght = interval.endTime - interval.startTime;
        let count = Math.floor(intervalLenght / selectedTreatmentDuration)
        let times = []
        let i = 0;
        if (count < 0) return null
        while (count !== i) {
            const startTime = numberToTime(interval.startTime + i * selectedTreatmentDuration)
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

    const createIntervalButton = (top: number, bottom: number, startTime: number, endTime: number, index: number) => {
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

    const createIntervalButtons = () => {
        let buttonLastIndex = 0

        const intervals = []
        const appointements = selectedDay.sort((a, b) => {
            if (appointementToHours(a) < appointementToHours(b)) return -1;
            if (appointementToHours(a) > appointementToHours(b)) return 1;
            return 0;
        })

        let firstAppointmentTime = appointementToHours(appointements[0])
        let freeIntervalStart = firstAppointmentTime
        let freeIntervalEnd: number = businessHours.closed;
        let formerIntervalEnd: number = 0;
        const startsFromOpening = firstAppointmentTime !== businessHours.open;

        if (startsFromOpening) {
            freeIntervalStart = formerIntervalEnd = businessHours.open
        } else {
            formerIntervalEnd = firstAppointmentTime + (appointements[0].treatment.duration / 60)
        }

        const addButtons = [];
        appointements.forEach((appointement: Appointement) => {
            const appointementStartTime = (appointement.start.hour + appointement.start.minutes / 60)
            const appointementEndTime = appointementStartTime + (appointement.treatment.duration / 60)

            const top = (formerIntervalEnd - businessHours.open) * pixelsPerHour
            const bottom = (appointementStartTime - businessHours.open) * pixelsPerHour

            freeIntervalStart = formerIntervalEnd
            freeIntervalEnd = appointementStartTime

            formerIntervalEnd = appointementEndTime

            const btn = createIntervalButton(top, bottom, freeIntervalStart, freeIntervalEnd, buttonLastIndex)

            buttonLastIndex++;

            if (freeIntervalStart < freeIntervalEnd) {
                addButtons.push(btn)
                intervals.push({ freeIntervalStart, freeIntervalEnd })
            }
        })

        const top = (formerIntervalEnd - businessHours.open) * pixelsPerHour
        const bottom = (businessHours.closed - businessHours.open) * pixelsPerHour

        freeIntervalStart = formerIntervalEnd - businessHours.open
        freeIntervalEnd = businessHours.closed - businessHours.open

        const btn = createIntervalButton(top, bottom, freeIntervalStart, freeIntervalEnd, buttonLastIndex)
        buttonLastIndex++;

        if (freeIntervalStart < freeIntervalEnd) {
            addButtons.push(btn)
            intervals.push({ freeIntervalStart, freeIntervalEnd })
        }
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
                    {createIntervalButtons()}
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
