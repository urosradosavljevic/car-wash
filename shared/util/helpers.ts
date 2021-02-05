import { Time } from "../../models/Time";
import { Appointement } from "../../models/Appointement";

export const appointementToHours = (appointement: Appointement) =>
  appointement.start.hour + appointement.start.minutes / 60;

export const numberToTime = (number: number) => ({
  hour: Math.floor(number),
  minutes: (number - Math.floor(number)) * 60,
});

export const timeToString = (t: Time) =>
  `${t.hour}:${t.minutes === 0 ? "00" : t.minutes}`;

export const compareTimes = (time1: Time | undefined, time2: Time | undefined) => {
  if (time1 && time2) {
    if (time1.hour === time2.hour && time1.minutes === time2.minutes)
      return true;
    return false;
  }
  return false;
};



export const parseTimeNumber = (time: number) => timeToString(numberToTime(time))