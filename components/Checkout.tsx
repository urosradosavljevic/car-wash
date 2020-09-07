import React from 'react'
import { inject, observer } from 'mobx-react'
import { FaUserAlt } from 'react-icons/fa/';
import OrderStore from '../stores/OrderStore';
import styles from '../styles/steps/Checkout.module.scss';
import { timeToString } from '../util/helpers';
import treatments from '../constants/treatments';

interface Props {
    orderStore?: OrderStore;
}

export const Checkout: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {
    const appointementStore = orderStore!
    const process = treatments[appointementStore.vehicle][appointementStore.treatment].process;

    return (<div className={styles.checkout__wrapp}>
        <div className={styles.checkout__client_wrap}>
            <div><FaUserAlt fontSize="3rem" /></div>
            <div className={styles.checkout__client_data} >
                <span>{appointementStore.client ? appointementStore.client.name : "John"}</span>
                <span>{appointementStore.client ? appointementStore.client.phoneNumber : "+381 63 658 695"}</span>
            </div>
        </div>
        <div className={styles.checkout__appointement_wrap}>
            <div className={styles.checkout__summary_wrap}>
                <span>Appointement summary:</span>
                <div className={styles.checkout__summary}>

                    <ul className={styles.checkout__summary_label}>
                        {appointementStore.date &&
                            <li>Date:</li>}
                        <li>Vehicle type:</li>
                        <li>Treatment type:</li>
                        <li>Time:</li>
                    </ul>
                    <ul className={styles.checkout__summary_data}>
                        {appointementStore.date &&
                            <li>{appointementStore.date.getDate()}.{appointementStore.date.getMonth() && appointementStore.date?.getMonth() + 1}.{appointementStore.date.getFullYear()}.
                            </li>}
                        <li>{appointementStore.vehicle}</li>
                        <li>{appointementStore.treatment}</li>
                        {appointementStore.startTime && <li>{timeToString(appointementStore.startTime)}</li>}
                    </ul>
                </div>
            </div>
            <div className={styles.treatment__details_wrap}>
                <span>Treatment Details:</span>
                <p>{process.description}</p>
                <ul>
                    {process.steps.map(step => (<li>{step}</li>))}
                </ul>
            </div>
        </div>
    </div>);
}))