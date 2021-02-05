import { businessHours, day as pseudoSelectedDay } from "../shared/data/days";


class AppointementService {

    fetchAppointements() {
        // fetch day schedule from db
        // const response = fetchScheduleForDay(this.date)
        // const {schedule} = response
        // this.selectedDaySchedule = schedule
        console.log("selectedDaySchedule fetched")
        return pseudoSelectedDay
    }

    fetchBusinesDays() {
        // fetch day schedule from db
        // const response = fetchBusinessHours()
        // const {businessHours} = response
        // this.businessHours = businessHours
        return businessHours
    }
}

export const appointementService = new AppointementService()
