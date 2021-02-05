import { Interval } from "../models/Inteval";
import { numberToTime } from "../shared/util/helpers";

class TimeService {
    extractPosibleTimes(
        interval: Interval,
        selectedTreatmentDuration: number
    ) {

        const intervalLenght = interval.endTime - interval.startTime;

        let timesCount = Math.floor(intervalLenght / selectedTreatmentDuration);
        let posibleTimes = [], i = 0;

        if (timesCount < 0) return []

        while (i < timesCount) {
            const startTime = numberToTime(interval.startTime + i * selectedTreatmentDuration)

            posibleTimes.push(startTime);

            i++;
        }

        return posibleTimes;
    }
}

export const timeService = new TimeService()