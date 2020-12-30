import React from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import clsx from 'clsx'

import { numberToTime, compareTimes, appointementToHours, timeToString } from '../../../shared/util/helpers'
import { businessHours, day as selectedDay } from "../../../shared/data/days"
import OrderStore from '../../../shared/stores/OrderStore'
import { Time } from '../../../models/Time'
import treatments from '../../../shared/data/treatments'

import styles from './Timeline.module.scss'
import UIStore from '../../../shared/stores/UIStore'
import { Appointement } from '../../../models/Appointement'
import { Interval } from '../../../models/Inteval'

interface Props {
    orderStore?: OrderStore;
    uiStore?: UIStore;
}


export const TimelineMobile: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {
    const appointementStore = orderStore!

    const selectedTreatmentDuration = (treatments[appointementStore.vehicle][appointementStore.treatment].duration / 60);


    // const fillSlogan = () => [...Array(30)].map((_, index) => (
    //     <p key={index}>OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED</p>
    // ))

    const selectStartTime = (startTime: Time) =>
        appointementStore.setStartTime(startTime);

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

    // const return  = (startTime: number, endTime: number, index: number) => {

    //     return (
    //         <div
    //             role="button" data-index={index}
    //             onClick={() => buttonClicked(startTime, endTime, index)}
    //             className={clsx(styles.timeline__add, index === selectedInterval?.index && styles.selected)}
    //         />)
    // }

    const extractIntervals = () => {

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

        appointements.forEach((appointement: Appointement) => {
            const appointementStartTime = (appointement.start.hour + appointement.start.minutes / 60)
            const appointementEndTime = appointementStartTime + (appointement.treatment.duration / 60)


            freeIntervalStart = formerIntervalEnd
            freeIntervalEnd = appointementStartTime

            formerIntervalEnd = appointementEndTime

            if (freeIntervalStart < freeIntervalEnd) {
                intervals.push({ startTime: freeIntervalStart, endTime: freeIntervalEnd })
            }
        })

        freeIntervalStart = formerIntervalEnd - businessHours.open
        freeIntervalEnd = businessHours.closed - businessHours.open

        if (freeIntervalStart < freeIntervalEnd) {
            intervals.push({ startTime: freeIntervalStart, endTime: freeIntervalEnd })
        }
        return intervals
    };
    const intervals = extractIntervals()

    return (
        <div className={styles.appointements_wrap}>
            <div className={styles.times_container}>
                <h3>Available times</h3>
                <div className={styles.mobile__times_wrap}>
                    {intervals.map(i => <div>
                        <div>{timeToString(numberToTime(i.startTime))} - {timeToString(numberToTime(i.endTime))}</div>
                        <div className={styles.times_wrap}>
                            {getPosibleTimes(i)}
                        </div>
                    </div>)}
                </div>
            </div>
        </div>);


}))
