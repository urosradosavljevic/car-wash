import React from 'react'
import { observer } from "mobx-react-lite"
import { FaMoneyBillWave, FaRegClock } from 'react-icons/fa/';
import { BiCalendarAlt } from 'react-icons/bi/';

import treatments from '../../../shared/data/treatments';
import styles from './Treatment.module.scss'
import { useScheduleStore } from '../../../shared/providers/RootStoreProvider';
import { TreatmentOptions } from './TreatmentOptions';

const TreatmentSelect: React.FC = observer(() => {
    const { vehicle, treatment, date, setVehicle, setTreatment } = useScheduleStore()
    const selectedTreatment = treatments[vehicle][treatment]



    return (
        <div className={styles.treatment__wrapp}>

            <div className={styles.treatment__selected}>

                <div>
                    <BiCalendarAlt size="1.2rem" />
                    <span>{` ${date?.getDate()}.${date?.getMonth() && date?.getMonth() + 1}.`}</span>
                </div>

                <div>
                    <FaRegClock size="1.2rem" />
                    <span>{` ${selectedTreatment.duration} min`}</span>
                </div>

                <div>
                    <FaMoneyBillWave size="1.2rem" />
                    <span>{` ${selectedTreatment.price} €`}</span>
                </div>

            </div>

            <TreatmentOptions
                vehicle={vehicle}
                treatment={treatment}
                setVehicle={setVehicle}
                setTreatment={setTreatment}
            />
        </div>
    );
})

export default TreatmentSelect;