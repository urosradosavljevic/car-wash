import React from 'react'
import { BusinessHours } from '../../../../models/Time'

import styles from '../Timeline.module.scss'

interface Props {
    businessHours: BusinessHours;
}

// Generate timeline background based on working hours 
export const TimelineBackground: React.FC<Props> = ({ businessHours }) => (
    <>
        <div className={styles.timeline__time} >

            {[...Array(businessHours.closed - businessHours.open)].map((_, index) =>
                <div
                    key={index}
                    className={styles.timeline__hour}
                >
                    <span>{businessHours.open + index}:00</span>
                </div>
            )
            }
        </div>
        <div className={styles.timeline__background}></div>
    </>
)