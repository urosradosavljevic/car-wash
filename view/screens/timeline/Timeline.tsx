import React, { useState } from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import clsx from 'clsx'

import { numberToTime, compareTimes, appointementToHours, timeToString } from '../../../shared/util/helpers'
import { businessHours, day as selectedDay } from "../../../shared/data/days"
import OrderStore from '../../../shared/stores/OrderStore'
import { timelineHeight } from '../../../shared/style'
import treatments from '../../../shared/data/treatments'

import styles from './Timeline.module.scss'
import UIStore from '../../../shared/stores/UIStore'
import { Appointement } from '../../../models/Appointement'
import { Interval } from '../../../models/Inteval'

interface Props {
    orderStore?: OrderStore;
    uiStore?: UIStore;
}

export const Timeline: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {

    const { vehicle, treatment, startTime: appStartTime, setStartTime } = orderStore!

    // calculate pixels per hour based on timeline height
    const pixelsPerHour = Math.floor(timelineHeight / (businessHours.closed - businessHours.open))
    const selectedTreatmentDuration = (treatments[vehicle][treatment].duration / 60);

    const [selectedInterval, setSelectedInterval] = useState<Interval | null>(null)

    const buttonClicked = (startTime: number, endTime: number, index: number) => {
        setSelectedInterval({ index, startTime, endTime });
    }

    // add posible treatments for inteval based on treatment duration
    const getPosibleTimes = (interval: Interval) => {

        const intervalLenght = interval.endTime - interval.startTime;

        let count = Math.floor(intervalLenght / selectedTreatmentDuration)
        let times = [], i = 0;

        if (count < 0) return null;

        while (count !== i) {
            const startTime = numberToTime(interval.startTime + i * selectedTreatmentDuration)

            times.push(
                <div role="button"
                    onClick={() => setStartTime(startTime)}
                    className={clsx(styles.time__btn, compareTimes(appStartTime!, startTime) && styles.time_selected)}
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

    // create button for passed interval
    const createIntervalButton = (top: number, bottom: number, startTime: number, endTime: number, index: number) => {
        top = Math.floor(top)
        const height = Math.floor(bottom - top)

        // Don't show intervals shorter than 15min ~ 17px
        if (height < pixelsPerHour / 4) return null

        return (
            <div
                role="button"
                data-index={index}
                onClick={() => buttonClicked(startTime, endTime, index)}
                style={{ top, height }}
                className={clsx(styles.timeline__add, index === selectedInterval?.index && styles.selected)}
            />)
    }

    // render all intervals buttons
    const createIntervalButtons = () => {
        let buttonLastIndex = 0
        const intervals = []

        // sort appointements by time
        const appointements = selectedDay.sort((a, b) => {
            if (appointementToHours(a) < appointementToHours(b)) return -1
            if (appointementToHours(a) > appointementToHours(b)) return 1
            return 0
        })

        let firstAppointmentTime = appointementToHours(appointements[0])
        let freeIntervalStart = firstAppointmentTime
        let freeIntervalEnd: number = businessHours.closed
        let formerIntervalEnd: number = 0
        const startsFromOpening = firstAppointmentTime !== businessHours.open

        //#region find first available termin
        if (startsFromOpening) {
            freeIntervalStart = formerIntervalEnd = businessHours.open
        } else {
            formerIntervalEnd = firstAppointmentTime + (appointements[0].treatment.duration / 60)
        }
        //#endregion

        const intervalButtons = [];

        // add buttons only for available appointements
        appointements.forEach((appointement: Appointement) => {
            const appointementStartTime = (appointement.start.hour + (appointement.start.minutes / 60))
            const appointementEndTime = appointementStartTime + (appointement.treatment.duration / 60)

            const top = (formerIntervalEnd - businessHours.open) * pixelsPerHour
            const bottom = (appointementStartTime - businessHours.open) * pixelsPerHour

            freeIntervalStart = formerIntervalEnd
            freeIntervalEnd = appointementStartTime

            formerIntervalEnd = appointementEndTime

            const btn = createIntervalButton(top, bottom, freeIntervalStart, freeIntervalEnd, buttonLastIndex)

            buttonLastIndex++;

            if (freeIntervalStart < freeIntervalEnd) {
                intervalButtons.push(btn)
                intervals.push({ freeIntervalStart, freeIntervalEnd })
            }
        })

        //#region  fill interval from last appointement until closed
        const top = (formerIntervalEnd - businessHours.open) * pixelsPerHour
        const bottom = (businessHours.closed - businessHours.open) * pixelsPerHour

        freeIntervalStart = formerIntervalEnd - businessHours.open
        freeIntervalEnd = businessHours.closed - businessHours.open

        const btn = createIntervalButton(top, bottom, freeIntervalStart, freeIntervalEnd, buttonLastIndex)
        buttonLastIndex++

        if (freeIntervalStart < freeIntervalEnd) {
            intervalButtons.push(btn)
            intervals.push({ freeIntervalStart, freeIntervalEnd })
        }
        //#endregion

        return intervalButtons
    };

    return (
        <div className={styles.appointements_wrap}>

            <div className={styles.timeline_container}>

                {/* Generate timeline background based on working hours */}
                <div className={styles.timeline__time} >

                    {[...Array(businessHours.closed - businessHours.open)].map((_, index) =>
                        <div key={index} className={styles.timeline__hour}>
                            <span>{businessHours.open + index}:00</span>
                        </div>)
                    }
                </div>

                <div className={styles.timeline__background_wrap}></div>

                <div className={styles.timeline__add_wrap}>
                    {createIntervalButtons()}
                </div>

            </div>
            <div className={styles.times_container}>

                <h3>Available times for period</h3>

                {selectedInterval &&
                    <div>
                        {timeToString(numberToTime(selectedInterval?.startTime))} - {timeToString(numberToTime(selectedInterval?.endTime))}
                    </div>
                }

                {selectedInterval !== null ?
                    <div className={styles.times_wrap}>
                        {getPosibleTimes(selectedInterval!)}
                    </div> :
                    <div style={{ marginTop: "3rem" }}>	&lt;-- Select Specific Period</div>
                }

            </div>
        </div>);


}))
