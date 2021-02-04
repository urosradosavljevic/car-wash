import { Time } from "../../models/Time";
import { Appointement } from "../../models/Appointement";
import { Interval } from "../../models/Inteval";

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

type CompareInterval = Interval | undefined | null

export const compareIntervals = (interval1: CompareInterval, interval2: CompareInterval) => {
  if (interval1 && interval2) {
    if (interval1.startTime === interval2.startTime &&
      interval1.endTime === interval2.endTime)
      return true;
    return false;
  }
  return false;
};

export const parseTimeNumber = (time: number) => timeToString(numberToTime(time))