import React from 'react'
import { observer } from 'mobx-react-lite';

import styles from './Timeline.module.scss'
import { parseTimeNumber } from '../../../shared/util/helpers';
import { Interval } from '../../../models/Inteval';
import { useScheduleStore } from '../../../shared/providers/RootStoreProvider';
import treatments from '../../../shared/data/treatments';
import { TimeButtonsList } from './components/TimeButtonsList';

interface Props {
    selectedInterval: Interval | null;
}

export const TimelineTimes: React.FC<Props> = observer(({ selectedInterval }) => {

    const { vehicle, treatment, startTime: selectedStartTime, setStartTime } = useScheduleStore();

    const selectedTreatmentDuration = (treatments[vehicle][treatment].duration / 60);

    return (
        <div className={styles.times_container}>

            <h3>Available times for period</h3>

            {selectedInterval &&
                <div>
                    {parseTimeNumber(selectedInterval?.startTime)} - {parseTimeNumber(selectedInterval?.endTime)}
                </div>
            }

            {selectedInterval !== null ?
                <TimeButtonsList
                    selectedTime={selectedStartTime}
                    treatmentDuration={selectedTreatmentDuration}
                    setStartTime={setStartTime}
                    interval={selectedInterval}
                /> :
                <div style={{ marginTop: "3rem" }}>
                    {`<--  Select Desired Period`}
                </div>
            }

        </div>
    );
})