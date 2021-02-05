import { Appointement } from "../models/Appointement";
import { Interval } from "../models/Inteval";
import { BusinessHours, Time } from "../models/Time";
import { appointementToHours } from "../shared/util/helpers";

type CompareInterval = Interval | undefined | null

class IntervalService {

    compareIntervals(interval1: CompareInterval, interval2: CompareInterval) {
        if (interval1 && interval2) {
            if (interval1.startTime === interval2.startTime &&
                interval1.endTime === interval2.endTime)
                return true;
            return false;
        }
        return false;
    };

    extractIntervals(
        selectedDay: Array<Appointement>,
        businessHours: BusinessHours,
        treatmentDuration?: number
    ) {
        const intervals = []

        const appointements = selectedDay.slice().sort((a, b) => {
            if (appointementToHours(a) < appointementToHours(b)) return -1;
            if (appointementToHours(a) > appointementToHours(b)) return 1;
            return 0;
        })
        let firstAppointmentTime = appointementToHours(appointements[0])
        let freeIntervalStart = firstAppointmentTime
        let freeIntervalEnd: number = businessHours.closed;
        let formerIntervalEnd: number = 0;
        const startsFromOpening = firstAppointmentTime !== businessHours.open;

        if (startsFromOpening) {
            freeIntervalStart = formerIntervalEnd = businessHours.open
        } else {
            formerIntervalEnd = firstAppointmentTime + (appointements[0].treatment.duration / 60)
        }

        appointements.forEach((appointement: Appointement) => {
            const appointementStartTime = (appointement.start.hour + appointement.start.minutes / 60)
            const appointementEndTime = appointementStartTime + (appointement.treatment.duration / 60)

            freeIntervalStart = formerIntervalEnd
            freeIntervalEnd = appointementStartTime

            formerIntervalEnd = appointementEndTime

            if (freeIntervalStart < freeIntervalEnd) {
                intervals.push({ startTime: freeIntervalStart, endTime: freeIntervalEnd })
            }
        })

        freeIntervalStart = formerIntervalEnd
        freeIntervalEnd = businessHours.closed

        if (freeIntervalStart < freeIntervalEnd) {
            intervals.push({ startTime: freeIntervalStart, endTime: freeIntervalEnd })
        }

        // Don't show intervals shorter than treatment length    
        if (treatmentDuration) {
            return intervals.filter(interv => (interv.endTime - interv.startTime) >= treatmentDuration)
        }

        return intervals
    };

    exportIntervalFromTime = (time: Time | undefined, businessHours: BusinessHours, day: Array<Appointement>) => {
        if (!time) return null
        const timeH = time.hour + (time.minutes / 60)

        const validDaysFilter = (interval: Interval) =>
            interval.endTime > timeH && timeH >= interval.startTime

        const found = this.extractIntervals(day, businessHours).find(validDaysFilter)

        return found ? found : null
    }
}

export const intervalService = new IntervalService()