import React from 'react'
import { inject, observer } from 'mobx-react';
import { FaShower, FaCarAlt, FaShuttleVan, FaTruck, FaMoneyBillWave, FaRegClock } from 'react-icons/fa/';
import { GiVacuumCleaner } from 'react-icons/gi/';
import { WiStars } from 'react-icons/wi/';
import { BiCalendarAlt } from 'react-icons/bi/';

import treatments from '../constants/treatments';
import OrderStore from '../stores/OrderStore';
import styles from '../styles/steps/Treatment.module.scss'
import { Vehicle } from '../constants/types/Vehicle';
import { Treatment } from '../constants/types/Treatment';
import clsx from 'clsx';

interface Props {
    orderStore?: OrderStore;
}

export const TreatmentSelect: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {
    const appointementStore = orderStore!

    const isVehicleSelected = (vehicle: Vehicle) => appointementStore.vehicle === vehicle && styles.option__btn_selected
    const isTreatmentSelected = (treatment: Treatment) => appointementStore.treatment === treatment && styles.option__btn_selected

    return (
        <div className={styles.treatment__wrapp}>
            <div className={styles.treatment__selected}>
                <div>
                    <BiCalendarAlt size="1.2rem" />
                    <span>{" "}
                        {appointementStore.date?.getDate()}.{appointementStore.date?.getMonth() && appointementStore.date?.getMonth() + 1}.
                    </span>
                </div>
                <div>
                    <FaRegClock size="1.2rem" />
                    <span>{" "}{treatments[appointementStore.vehicle][appointementStore.treatment].duration} min</span>
                </div>
                <div>
                    <FaMoneyBillWave size="1.2rem" />
                    <span>{" "}{treatments[appointementStore.vehicle][appointementStore.treatment].price} €</span>
                </div>
            </div>
            <div className={styles.treatment__options_wrapp}>
                <div className={styles.options}>
                    <div className={clsx(styles.option_wrap, isVehicleSelected(Vehicle.car))} onClick={() => appointementStore.setVehicle(Vehicle.car)}>
                        <FaCarAlt size="3rem" />
                        <span>Car</span>
                    </div>
                    <div className={clsx(styles.option_wrap, isVehicleSelected(Vehicle.van))} onClick={() => appointementStore.setVehicle(Vehicle.van)}>
                        <FaShuttleVan size="3rem" />
                        <span>Van</span>
                    </div>
                    <div className={clsx(styles.option_wrap, isVehicleSelected(Vehicle.truck))} onClick={() => appointementStore.setVehicle(Vehicle.truck)}>
                        <FaTruck size="3rem" />
                        <span>Truck</span>
                    </div>
                </div>
                <div className={styles.options}>
                    <div className={clsx(styles.option_wrap, isTreatmentSelected(Treatment.inside))} onClick={() => appointementStore.setTreatment(Treatment.inside)}>
                        <GiVacuumCleaner size="3rem" />
                        <span>Inside</span>
                    </div>
                    <div className={clsx(styles.option_wrap, isTreatmentSelected(Treatment.outside))} onClick={() => appointementStore.setTreatment(Treatment.outside)}>
                        <FaShower size="3rem" />
                        <span>Outside</span>
                    </div>
                    <div className={clsx(styles.option_wrap, isTreatmentSelected(Treatment.full))} onClick={() => appointementStore.setTreatment(Treatment.full)}>
                        <WiStars size="3rem" />
                        <span>Full</span>
                    </div>
                </div>
            </div>
        </div>);
}))