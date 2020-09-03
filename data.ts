import vehicles from "./constants/vehicles";
import { Time } from "./constants/types/Time";
import { ClientData } from "./constants/types/ClientData";

export const businessHours = { open: 7, closed: 19 };
interface Appointement {
  client: ClientData;
  treatment: {
    duration: number;
    price: number;
  };
  start: Time;
}

export const day: Array<Appointement> = [
  {
    client: {
      name: "John",
      phoneNumber: "+384",
    },
    treatment: vehicles.car.inside,
    start: {
      hour: 7,
      minutes: 0,
    },
  },
  {
    client: {
      name: "Mike",
      phoneNumber: "+384",
    },
    treatment: vehicles.car.inside,
    start: {
      hour: 9,
      minutes: 0,
    },
  },
  {
    client: {
      name: "Sarah",
      phoneNumber: "+384",
    },
    treatment: vehicles.truck.outside,
    start: {
      hour: 12,
      minutes: 30,
    },
  },
  {
    client: {
      name: "Alister",
      phoneNumber: "+384",
    },
    treatment: vehicles.car.full,
    start: {
      hour: 15,
      minutes: 0,
    },
  },
  {
    client: {
      name: "Tommy",
      phoneNumber: "+384",
    },
    treatment: vehicles.car.full,
    start: {
      hour: 15,
      minutes: 30,
    },
  },
  {
    client: {
      name: "Cari",
      phoneNumber: "+384",
    },
    treatment: vehicles.van.full,
    start: {
      hour: 17,
      minutes: 0,
    },
  },
];
