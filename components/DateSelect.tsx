import React, { useEffect } from 'react'
import DatePicker from "react-datepicker"
import { inject, observer } from 'mobx-react';

import styles from '../styles/steps/DateSelect.module.scss'
import OrderStore from '../stores/OrderStore'
import UIStore from '../stores/UIStore';

interface Props {
    orderStore?: OrderStore;
    uiStore?: UIStore;
}
export const DateSelect: React.FC<Props> = inject("orderStore", "uiStore")(observer(({ orderStore, uiStore }) => {
    const appointementStore = orderStore!;
    const ui = uiStore!;
    const today = new Date();

    useEffect(() => {
        appointementStore.setDate(today)
    }, [])

    return (
        <div className={styles.datepickerWrap}>
            <DatePicker
                disabledKeyboardNavigation
                selected={new Date(appointementStore.date)}
                // selected={appointementStore.date}
                onChange={appointementStore.setDate}
                monthsShown={ui.isMobile ? 1 : 2}
                minDate={new Date(today.getFullYear(), today.getMonth(), 1)}
                maxDate={new Date(today.getFullYear(), today.getMonth() + 2, 0)}
                inline
            />
        </div>
    );
}))