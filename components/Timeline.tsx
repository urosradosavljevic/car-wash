import React, { useState } from 'react'
import styles from '../styles/Timeline.module.scss'
import { businessHours, day } from "../data"
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import OrderStore from '../stores/OrderStore'

interface Props {
    orderStore?: OrderStore;
}

export const Timeline: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {

    const [selectedInterval, setSelectedInterval] = useState("none")
    const [todayOccupied, setTodayOccupied] = useState(day)

    const fillSlogan = () => [...Array(30)].map(_ => (
        <p>OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED</p>
    ))
    console.log(todayOccupied);

    const hoursInterval = (treatment: any) => (treatment.start.hour + (treatment.start.minutes / 60))

    const buttonClicked = (startTime: number, endTime: number) => {
        setSelectedInterval(`You selected interval from : ${startTime}, to: ${endTime}`)
        let startH = Math.floor(startTime)
        let startM = Math.ceil((startTime - startH) * 60)
        // TODO: Check if treatment can fit  
        if (orderStore.treatment !== null) {
            const temp = { treatment: orderStore.treatment, start: { hour: startH, minutes: startM > 60 ? 0 : startM } }
            console.log("new appointement", temp);
            const newTreatments = [...todayOccupied, temp]
            console.log("newTreatments", newTreatments);
            newTreatments.sort((a, b) => {
                if (hoursInterval(a) > hoursInterval(b)) {
                    return 1;
                }
                if (hoursInterval(b) > hoursInterval(a)) {
                    return -1;
                }
                return 0;
            })
            console.log("newTreatments", newTreatments);
            // TODO: ovde stadoh
            setTodayOccupied(newTreatments)
            console.log(todayOccupied);
        }


    }

    const createAddButton = (top: number, bottom: number, startTime: number, endTime: number) => {
        top = Math.floor(top)
        const height = Math.floor(bottom - top)

        // Don't show intervals shorter than 15min ~ 17px
        if (height < 17) return null

        return <div onClick={() => buttonClicked(startTime, endTime)} style={{ top, height }} className={styles.timeline__add}>
            <span>+ Choose treatment</span>
        </div>
    }

    const createAddButtons = () => {
        const pixelsPerHour = (800 / (businessHours.closed - businessHours.open))

        let startsFromBeginning = false;
        let firstAppointmentTime = hoursInterval(todayOccupied[0])
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
                freeIntervalStart = formerIntervalEnd
                freeIntervalEnd = appointementStartTime
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
                {console.log("rerender")}
                {createAddButtons()}
            </div>
        </div>
    </>);


}))
