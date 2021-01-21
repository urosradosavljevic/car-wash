import React from 'react'
import clsx from 'clsx'

import styles from './Timeline.module.scss'
import { Appointement } from '../../../models/Appointement';
import { appointementToHours } from '../../../shared/util/helpers';
import { timelineHeight } from '../../../shared/style'
import { Interval } from '../../../models/Inteval';
import { BusinessHours } from '../../../models/Time';

interface Props {
    businessHours: BusinessHours;
    selectedDay: Array<Appointement>;
    selectedInterval: Interval | null;
    setSelectedInterval: (interval: Interval) => void;
}

export const TimelineIntervals: React.FC<Props> = ({
    selectedDay,
    businessHours,
    setSelectedInterval,
    selectedInterval
}) => {

    // calculate pixels per hour based on timeline height
    const pixelsPerHour = Math.floor(timelineHeight / (businessHours.closed - businessHours.open))

    const intervalBtnClicked = (startTime: number, endTime: number, index: number) =>
        setSelectedInterval({ index, startTime, endTime });

    // create button for passed interval
    const createIntervalButton = (
        top: number,
        bottom: number,
        startTime: number,
        endTime: number,
        index: number
    ) => {
        top = Math.floor(top)
        const height = Math.floor(bottom - top)

        const intervalClassNames = clsx(
            styles.timeline__add,
            index === selectedInterval?.index && styles.selected
        )

        // Don't show intervals shorter than 15min ~ 17px
        if (height < pixelsPerHour / 4) return null

        return (
            <div
                role="button"
                data-index={index}
                onClick={() => intervalBtnClicked(startTime, endTime, index)}
                style={{ top, height }}
                className={intervalClassNames}
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
        <div className={styles.timeline__add_wrap}>
            {createIntervalButtons()}
        </div>
    );
}