import vehicles from "./constants/vehicles";

export const businessHours = { open: 7, closed: 19 };

export const day = [
  {
    treatment: vehicles.CAR.inside,
    start: {
      hour: 9,
      minutes: 0,
    },
  },
  {
    treatment: vehicles.TRUCK.outside,
    start: {
      hour: 12,
      minutes: 20,
    },
  },
  {
    treatment: vehicles.CAR.full,
    start: {
      hour: 15,
      minutes: 0,
    },
  },
  {
    treatment: vehicles.CAR.full,
    start: {
      hour: 15,
      minutes: 50,
    },
  },
  {
    treatment: vehicles.VAN.full,
    start: {
      hour: 17,
      minutes: 0,
    },
  },
];
