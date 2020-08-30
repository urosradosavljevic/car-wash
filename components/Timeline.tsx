import React, { useState } from 'react'
import styles from '../styles/Timeline.module.scss'
import { businessHours, day as todayOccupied } from "../data"
// import { set, add } from 'date-fns'

interface Props {
    businessHours: {
        open: number;
        closed: number;
    };
    todayOccupied: any;
}


export const Timeline: React.FC<Props> = ({ }) => {
    console.log("***********************************")
    const [selectedInterval, setSelectedInterval] = useState("none")


    const fillSlogan = () => [...Array(30)].map(_ => (
        <p>OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED</p>
    ))

    const buttonClicked = (startTime: number, endTime: number) => {
        setSelectedInterval(`You selected interval from : ${startTime}, to: ${endTime}`)
    }

    const createAddButton = (top: number, bottom: number, startTime: number, endTime: number) => {
        top = Math.floor(top)
        const height = Math.floor(bottom - top)

        if (height === 0) return null

        return <div onClick={() => buttonClicked(startTime, endTime)} style={{ top, height }} className={styles.timeline__add}>
            <span>+ Choose treatment</span>
        </div>
    }

    const createAddButtons = () => {
        const pixelsPerHour = (800 / (businessHours.closed - businessHours.open))

        let startsFromBeginning = false;
        let firstAppointmentTime = todayOccupied[0].start.hour + (todayOccupied[0].start.minutes / 60);
        let freeIntervalStart = firstAppointmentTime
        let freeIntervalEnd: number = businessHours.closed;
        let isLastInterval: boolean = false;

        if (firstAppointmentTime !== businessHours.open) {
            startsFromBeginning = true;
            freeIntervalStart = businessHours.open
        }

        let formerIntervalEnd: number = startsFromBeginning ? businessHours.open : firstAppointmentTime + (todayOccupied[0].treatment.duration / 60)

        let addButtons = todayOccupied.map((appointement: any) => {

            isLastInterval = appointement === todayOccupied[todayOccupied.length - 1]
            const appointementStartTime = appointement.start.hour + (appointement.start.minutes / 60)
            const appointementEndTime = appointement.start.hour + (appointement.start.minutes / 60) + (appointement.treatment.duration / 60)

            if (startsFromBeginning) {
                freeIntervalStart = formerIntervalEnd
                freeIntervalEnd = appointementStartTime
            } else {
                freeIntervalStart = appointementStartTime
                freeIntervalEnd = appointementEndTime
            }

            const top = (freeIntervalStart - businessHours.open) * pixelsPerHour
            const bottom = (freeIntervalEnd - businessHours.open) * pixelsPerHour

            formerIntervalEnd = appointementEndTime

            return createAddButton(top, bottom, freeIntervalStart, freeIntervalEnd)
        })

        const top = (formerIntervalEnd - businessHours.open) * pixelsPerHour
        const bottom = (businessHours.closed - businessHours.open) * pixelsPerHour

        addButtons.push(createAddButton(top, bottom, formerIntervalEnd - businessHours.open, businessHours.closed - businessHours.open))

        return addButtons
    };

    return (<>
        <div>{selectedInterval}</div>
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
    </>);


}
