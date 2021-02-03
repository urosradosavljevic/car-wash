import { Appointement } from "../../models/Appointement";
import { businessHours } from "../data/days";
import { appointementToHours } from "./helpers";

export const extractIntervals = (
    selectedDay: Array<Appointement>
) => {
    const intervals = []

    const appointements = selectedDay.sort((a, b) => {
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

    return intervals
};

