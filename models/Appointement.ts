import { Time } from "./Time";
import { ClientData } from "./ClientData";

export interface Appointement {
  client: ClientData;
  treatment: {
    duration: number;
    price: number;
  };
  start: Time;
}
