import { Vehicle } from "./types/Vehicle";
import { Treatment } from "./types/Treatment";

export default {
  [Vehicle.car]: {
    [Treatment.inside]: {
      duration: 30,
      price: 10,
    },
    [Treatment.outside]: {
      duration: 15,
      price: 5,
    },
    [Treatment.full]: {
      duration: 45,
      price: 15,
    },
  },
  [Vehicle.van]: {
    [Treatment.inside]: {
      duration: 30,
      price: 15,
    },
    [Treatment.outside]: {
      duration: 30,
      price: 10,
    },
    [Treatment.full]: {
      duration: 60,
      price: 25,
    },
  },
  [Vehicle.truck]: {
    [Treatment.inside]: {
      duration: 30,
      price: 15,
    },
    [Treatment.outside]: {
      duration: 60,
      price: 20,
    },
    [Treatment.full]: {
      duration: 90,
      price: 35,
    },
  },
};
