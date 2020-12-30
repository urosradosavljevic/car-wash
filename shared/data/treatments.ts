import { Treatment } from "../../models/Treatment";
import { Vehicle } from "../../models/Vehicle";

const lipsumProcess = {
  steps: [
    "Nunc lorem enim, auctor eget sem finibus.",
    "Suspendisse lectus lacus.",
    "Praesent in purus quam. ",
  ],
  description:
    "Duis congue egestas tincidunt. Duis eu diam at elit pretium pharetra. Phasellus euismod massa ut metus condimentum vulputate. Vestibulum vitae blandit magna, at pharetra nunc. Ut et urna vel dolor porttitor finibus id vel justo. ",
};

export default {
  [Vehicle.car]: {
    [Treatment.inside]: {
      duration: 30,
      price: 10,
      process: lipsumProcess,
    },
    [Treatment.outside]: {
      duration: 15,
      price: 10,
      process: lipsumProcess,
    },
    [Treatment.full]: {
      duration: 45,
      price: 15,
      process: lipsumProcess,
    },
  },
  [Vehicle.van]: {
    [Treatment.inside]: {
      duration: 30,
      price: 15,
      process: lipsumProcess,
    },
    [Treatment.outside]: {
      duration: 30,
      price: 10,
      process: lipsumProcess,
    },
    [Treatment.full]: {
      duration: 60,
      price: 25,
      process: lipsumProcess,
    },
  },
  [Vehicle.truck]: {
    [Treatment.inside]: {
      duration: 30,
      price: 15,
      process: lipsumProcess,
    },
    [Treatment.outside]: {
      duration: 60,
      price: 20,
      process: lipsumProcess,
    },
    [Treatment.full]: {
      duration: 90,
      price: 35,
      process: lipsumProcess,
    },
  },
};
