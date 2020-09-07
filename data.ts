import treatments from "./constants/treatments";
import { Appointement } from "./constants/types/Appointement";

export const businessHours = { open: 7, closed: 19 };

export const day: Array<Appointement> = [
  // {
  //   client: {
  //     name: "John",
  //     phoneNumber: "+384",
  //   },
  //   treatment: treatments.car.inside,
  //   start: {
  //     hour: 7,
  //     minutes: 0,
  //   },
  // },
  {
    client: {
      name: "Mike",
      phoneNumber: "+384",
    },
    treatment: treatments.car.inside,
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
    treatment: treatments.truck.outside,
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
    treatment: treatments.car.inside,
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
    treatment: treatments.car.full,
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
    treatment: treatments.van.full,
    start: {
      hour: 17,
      minutes: 0,
    },
  },
];
