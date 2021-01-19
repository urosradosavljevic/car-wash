import React, { useEffect, useState } from 'react'
import { observer } from "mobx-react-lite"
import DatePicker from "react-datepicker"

import styles from './DateSelect.module.scss'
import { useScheduleStore, useUIStore } from '../../../shared/providers/RootStoreProvider';


export const DateSelect: React.FC = observer(() => {

    const uiStore = useUIStore()
    const { date, setDate } = useScheduleStore();

    const [today] = useState(new Date());

    useEffect(() => {
        // set current day
        setDate(today)
    }, [])

    useEffect(() => {
        console.log(date)
    }, [date])

    return (
        <div className={styles.datepickerWrap}>
            <DatePicker
                disabledKeyboardNavigation
                selected={new Date(date)}
                onChange={setDate}
                monthsShown={uiStore.isMobile ? 1 : 2}
                minDate={new Date()}
                maxDate={new Date(today.getFullYear(), today.getMonth() + 2, 0)}
                inline
            />
        </div>
    );
})