import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import styles from '../styles/DateSelect.module.scss'
import OrderStore from '../stores/OrderStore'

interface Props {
    date: OrderStore["date"];
    setDate: (arg0: Date) => void;
}

export const DateSelect: React.FC<Props> = ({ date, setDate }) => {
    return (
        <div className={styles.datepickerWrap}>
            <DatePicker
                disabledKeyboardNavigation
                selected={date}
                onChange={setDate}
                monthsShown={2}
                // calendarClassName={styles.calendar}
                inline
            // renderCustomHeader={}
            />
        </div>
    );
}