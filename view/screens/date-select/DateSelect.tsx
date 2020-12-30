import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import { inject, observer } from 'mobx-react';

import styles from './DateSelect.module.scss'
import OrderStore from '../../../shared/stores/OrderStore'
import UIStore from '../../../shared/stores/UIStore';

interface Props {
    orderStore?: OrderStore;
    uiStore?: UIStore;
}

export const DateSelect: React.FC<Props> = inject("orderStore", "uiStore")(observer(({ orderStore, uiStore }) => {
    const { date, setDate } = orderStore!;
    const ui = uiStore!;
    const [today] = useState(new Date());

    useEffect(() => {
        // set current day
        setDate(today)
    }, [])

    return (
        <div className={styles.datepickerWrap}>
            <DatePicker
                disabledKeyboardNavigation
                selected={new Date(date)}
                onChange={setDate}
                monthsShown={ui.isMobile ? 1 : 2}
                minDate={new Date()}
                maxDate={new Date(today.getFullYear(), today.getMonth() + 2, 0)}
                inline
            />
        </div>
    );
}))