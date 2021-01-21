import React from 'react'
import clsx from 'clsx';

import { FaShower, FaCarAlt, FaShuttleVan, FaTruck, } from 'react-icons/fa/';
import { GiVacuumCleaner } from 'react-icons/gi/';
import { WiStars } from 'react-icons/wi/';

import styles from './Treatment.module.scss'
import { Treatment } from '../../../models/Treatment';
import { Vehicle } from '../../../models/Vehicle';

interface Props {
    treatment: Treatment;
    vehicle: Vehicle;
    setTreatment: (treatment: Treatment) => void;
    setVehicle: (vehicle: Vehicle) => void;
}


export const TreatmentOptions: React.FC<Props> = ({ vehicle, treatment, setVehicle, setTreatment }) => {

    const isTreatmentSelected = (treat: Treatment) => treat === treatment && styles.option__btn_selected
    const isVehicleSelected = (veh: Vehicle) => veh === vehicle && styles.option__btn_selected

    const treatmentStyles = (treat: Treatment) => clsx(styles.option_wrap, isTreatmentSelected(treat))
    const vehicleStyles = (veh: Vehicle) => clsx(styles.option_wrap, isVehicleSelected(veh))

    return (<div className={styles.treatment__options_wrapp}>

        <div className={styles.options}>

            <div
                className={vehicleStyles(Vehicle.car)}
                onClick={() => setVehicle(Vehicle.car)}
            >
                <FaCarAlt size="3rem" />
                <span>Car</span>
            </div>

            <div
                className={vehicleStyles(Vehicle.van)}
                onClick={() => setVehicle(Vehicle.van)}
            >
                <FaShuttleVan size="3rem" />
                <span>Van</span>
            </div>

            <div
                className={vehicleStyles(Vehicle.truck)}
                onClick={() => setVehicle(Vehicle.truck)}
            >
                <FaTruck size="3rem" />
                <span>Truck</span>
            </div>
        </div>

        <div className={styles.options}>

            <div
                className={treatmentStyles(Treatment.inside)}
                onClick={() => setTreatment(Treatment.inside)}
            >
                <GiVacuumCleaner size="3rem" />
                <span>Inside</span>
            </div>

            <div
                className={treatmentStyles(Treatment.outside)}
                onClick={() => setTreatment(Treatment.outside)}
            >
                <FaShower size="3rem" />
                <span>Outside</span>
            </div>

            <div
                className={treatmentStyles(Treatment.full)}
                onClick={() => setTreatment(Treatment.full)}
            >
                <WiStars size="3rem" />
                <span>Full</span>
            </div>

        </div>

    </div>);
}