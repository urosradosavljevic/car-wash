import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react';
import { FaShower, FaCarAlt, FaShuttleVan, FaTruck, FaMoneyBillWave, FaRegClock } from 'react-icons/fa/';
import { GiVacuumCleaner } from 'react-icons/gi/';
import { WiStars } from 'react-icons/wi/';
import { BiCalendarAlt } from 'react-icons/bi/';
import vehicles from '../constants/vehicles';
import OrderStore from '../stores/OrderStore';
import styles from '../styles/Treatment.module.scss'

interface Props {
    orderStore?: OrderStore;
}

export const Treatment: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {

    const [vehicle, setVehicle] = useState<"car" | "van" | "truck">("car")
    const [treatment, setTreatment] = useState<"inside" | "outside" | "full">("inside")


    const changeTreatment = () => {
        const t = vehicles[vehicle][treatment]
        orderStore.treatment = t
    }

    useEffect(() => {
        changeTreatment()
    }, [vehicle, treatment])

    return (
        <div>

            <div>
                <div>
                    <BiCalendarAlt size="1rem" />
                    <span>{" "}{orderStore.date?.getDate()}.{orderStore.date?.getMonth() && orderStore.date?.getMonth() + 1}.</span>
                </div>
                <div>
                    <FaMoneyBillWave size="1rem" />
                    <span>{" "}{orderStore.treatment?.price} €</span>
                </div>
                <div>
                    <FaRegClock size="1rem" />
                    <span>{" "}{orderStore.treatment?.duration} min</span>
                </div>
            </div>
            <div className={styles.treatment__wrapp}>
                <div className={styles.vehicle__options}>
                    <div className={styles.vehicle__option_wrap} onClick={() => setVehicle("car")}>
                        <FaCarAlt size="3rem" style={{ color: vehicle === "car" ? "greenyellow" : "black" }} />
                        <span>Car</span>
                    </div>
                    <div className={styles.vehicle__option_wrap} onClick={() => setVehicle("van")}>
                        <FaShuttleVan size="3rem" style={{ color: vehicle === "van" ? "greenyellow" : "black" }} />
                        <span>Van</span>
                    </div>
                    <div className={styles.vehicle__option_wrap} onClick={() => setVehicle("truck")}>
                        <FaTruck size="3rem" style={{ color: vehicle === "truck" ? "greenyellow" : "black" }} />
                        <span>Truck</span>
                    </div>
                </div>
                <div className={styles.treatment__options}>
                    <div className={styles.treatment__option_wrap} onClick={() => setTreatment("inside")}>
                        <GiVacuumCleaner size="3rem" style={{ color: treatment === "inside" ? "greenyellow" : "black" }} />
                        <span>Inside</span>
                    </div>
                    <div className={styles.treatment__option_wrap} onClick={() => setTreatment("outside")}>
                        <FaShower size="3rem" style={{ color: treatment === "outside" ? "greenyellow" : "black" }} />
                        <span>Outside</span>
                    </div>
                    <div className={styles.treatment__option_wrap} onClick={() => setTreatment("full")}>
                        <WiStars size="3rem" style={{ color: treatment === "full" ? "greenyellow" : "black" }} />
                        <span>Full</span>
                    </div>
                </div>
            </div>
        </div>);
}))