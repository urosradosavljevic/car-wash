import React from 'react'
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

    const fillSlogan = () => [...Array(30)].map(_ => (
        <p>OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED&nbsp;&nbsp;&nbsp;&nbsp;OCCUPIED</p>
    ))

    const createAddButtons = () => {


        return todayOccupied.map((appointement: any) => {

            console.log("////////")
            const startTime = appointement.start.hour + (appointement.start.minutes / 60)
            const endTime = appointement.start.hour + (appointement.start.minutes / 60) + (appointement.treatment.duration / 60)

            const pixelsPerHour = (800 / (businessHours.closed - businessHours.open))

            console.log("startTime", startTime)
            console.log("endTime", endTime)
            // duzina wrapp-a
            const top = (startTime - businessHours.open) * pixelsPerHour
            const bottom = (endTime - businessHours.open) * pixelsPerHour

            console.log("top", top)
            console.log("bottom", bottom)

            return <div style={{ top: Math.floor(top), height: Math.floor(bottom - top) }} className={styles.timeline__add}></div>
        })
    };

    return (<>
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
                {/* <div className={styles.timeline__add} >dugme</div> */}
            </div>
        </div>
    </>);


}

// export const getStaticProps = async () => {
//     return {
//         props: { bH, todayOccupied },
//     }
// }