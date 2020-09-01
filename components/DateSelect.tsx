import React from 'react'
import DatePicker from "react-datepicker"
import styles from '../styles/DateSelect.module.scss'
import OrderStore from '../stores/OrderStore'
import { inject, observer } from 'mobx-react';

interface Props {
    orderStore?: OrderStore;
}
export const DateSelect: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {
    const appointementStore = orderStore!

    return (
        <div className={styles.datepickerWrap}>
            <DatePicker
                disabledKeyboardNavigation
                selected={appointementStore.date}
                onChange={appointementStore.setDate}
                monthsShown={2}
                inline
            />
        </div>
    );
}))