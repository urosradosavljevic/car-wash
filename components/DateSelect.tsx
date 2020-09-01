import React from 'react'
import DatePicker from "react-datepicker"
import { inject, observer } from 'mobx-react';

import styles from '../styles/DateSelect.module.scss'
import OrderStore from '../stores/OrderStore'

interface Props {
    orderStore?: OrderStore;
}
export const DateSelect: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {
    const appointementStore = orderStore!;
    const today = new Date();

    return (
        <div className={styles.datepickerWrap}>
            <DatePicker
                disabledKeyboardNavigation
                selected={new Date(appointementStore.date)}
                onChange={appointementStore.setDate}
                monthsShown={2}
                minDate={new Date(today.getFullYear(), today.getMonth(), 1)}
                maxDate={new Date(today.getFullYear(), today.getMonth() + 2, 0)}
                inline
            />
        </div>
    );
}))