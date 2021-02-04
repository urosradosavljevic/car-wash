import React from 'react'
import { observer } from 'mobx-react-lite';

import { FaUserAlt } from 'react-icons/fa/';
import styles from './Checkout.module.scss';

import { useScheduleStore } from "../../../shared/providers/RootStoreProvider"
import { timeToString } from '../../../shared/util/helpers';
import treatments from '../../../shared/data/treatments';

const Checkout: React.FC = observer(() => {
    const { client, date, startTime, vehicle, treatment } = useScheduleStore();

    const process = treatments[vehicle][treatment].process;

    return (<div className={styles.checkout__wrapp}>
        <div className={styles.checkout__client_wrap}>
            <div><FaUserAlt fontSize="3rem" /></div>
            <div className={styles.checkout__client_data} >
                <span>{client ? client.name : "John"}</span>
                <span>{client ? client.phoneNumber : "+381 63 658 695"}</span>
            </div>
        </div>
        <div className={styles.checkout__appointement_wrap}>
            <div className={styles.checkout__summary_wrap}>
                <span>Appointement summary:</span>
                <div className={styles.checkout__summary}>

                    <ul className={styles.checkout__summary_label}>
                        {date &&
                            <li>Date:</li>}
                        <li>Vehicle type:</li>
                        <li>Treatment type:</li>
                        <li>Time:</li>
                    </ul>
                    <ul className={styles.checkout__summary_data}>
                        {date &&
                            <li>{date.getDate()}.{date.getMonth() && date?.getMonth() + 1}.{date.getFullYear()}.
                            </li>}
                        <li>{vehicle}</li>
                        <li>{treatment}</li>
                        {startTime && <li>{timeToString(startTime)}</li>}
                    </ul>
                </div>
            </div>
            <div className={styles.treatment__details_wrap}>
                <span>Treatment Details:</span>
                <p>{process.description}</p>
                <ul>
                    {process.steps.map((step, idx) => (<li key={`step-${idx}`}>{step}</li>))}
                </ul>
            </div>
        </div>
    </div>);
})

export default Checkout;