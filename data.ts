import vehicles from "./constants/vehicles";

export const businessHours = { open: 7, closed: 19 };

export const day = [
  {
    treatment: vehicles.car.inside,
    start: {
      hour: 7,
      minutes: 0,
    },
  },
  {
    treatment: vehicles.car.inside,
    start: {
      hour: 9,
      minutes: 0,
    },
  },
  {
    treatment: vehicles.truck.outside,
    start: {
      hour: 12,
      minutes: 20,
    },
  },
  {
    treatment: vehicles.car.full,
    start: {
      hour: 15,
      minutes: 0,
    },
  },
  {
    treatment: vehicles.car.full,
    start: {
      hour: 15,
      minutes: 50,
    },
  },
  {
    treatment: vehicles.van.full,
    start: {
      hour: 17,
      minutes: 0,
    },
  },
];
