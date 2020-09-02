import React from 'react'
import { inject, observer } from 'mobx-react';
import { FaShower, FaCarAlt, FaShuttleVan, FaTruck, FaMoneyBillWave, FaRegClock } from 'react-icons/fa/';
import { GiVacuumCleaner } from 'react-icons/gi/';
import { WiStars } from 'react-icons/wi/';
import { BiCalendarAlt } from 'react-icons/bi/';

import vehicles from '../constants/vehicles';
import OrderStore from '../stores/OrderStore';
import styles from '../styles/Treatment.module.scss'
import { Vehicle } from '../constants/types/Vehicle';
import { Treatment } from '../constants/types/Treatment';

interface Props {
    orderStore?: OrderStore;
}

export const TreatmentSelect: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {
    const appointementStore = orderStore!

    const isVehicleSelected = (vehicle: Vehicle) => ({ color: appointementStore.vehicle === vehicle ? "greenyellow" : "black" })
    const isTreatmentSelected = (treatment: Treatment) => ({ color: appointementStore.treatment === treatment ? "greenyellow" : "black" })

    return (
        <div className={styles.treatment__wrapp}>
            <div className={styles.treatment__selected}>
                <div>
                    <BiCalendarAlt size="1.8rem" />
                    <span>{" "}
                        {appointementStore.date?.getDate()}.{appointementStore.date?.getMonth() && appointementStore.date?.getMonth() + 1}.
                    </span>
                </div>
                <div>
                    <FaRegClock size="1.8rem" />
                    <span>{" "}{vehicles[appointementStore.vehicle][appointementStore.treatment].duration} min</span>
                </div>
                <div>
                    <FaMoneyBillWave size="1.8rem" />
                    <span>{" "}{vehicles[appointementStore.vehicle][appointementStore.treatment].price} €</span>
                </div>
            </div>
            <div className={styles.treatment__options_wrapp}>
                <div className={styles.options}>
                    <div className={styles.option_wrap} onClick={() => appointementStore.setVehicle(Vehicle.car)}>
                        <FaCarAlt size="3rem" style={isVehicleSelected(Vehicle.car)} />
                        <span>Car</span>
                    </div>
                    <div className={styles.option_wrap} onClick={() => appointementStore.setVehicle(Vehicle.van)}>
                        <FaShuttleVan size="3rem" style={isVehicleSelected(Vehicle.van)} />
                        <span>Van</span>
                    </div>
                    <div className={styles.option_wrap} onClick={() => appointementStore.setVehicle(Vehicle.truck)}>
                        <FaTruck size="3rem" style={isVehicleSelected(Vehicle.truck)} />
                        <span>Truck</span>
                    </div>
                </div>
                <div className={styles.options}>
                    <div className={styles.option_wrap} onClick={() => appointementStore.setTreatment(Treatment.inside)}>
                        <GiVacuumCleaner size="3rem" style={isTreatmentSelected(Treatment.inside)} />
                        <span>Inside</span>
                    </div>
                    <div className={styles.option_wrap} onClick={() => appointementStore.setTreatment(Treatment.outside)}>
                        <FaShower size="3rem" style={isTreatmentSelected(Treatment.outside)} />
                        <span>Outside</span>
                    </div>
                    <div className={styles.option_wrap} onClick={() => appointementStore.setTreatment(Treatment.full)}>
                        <WiStars size="3rem" style={isTreatmentSelected(Treatment.full)} />
                        <span>Full</span>
                    </div>
                </div>
            </div>
        </div>);
}))