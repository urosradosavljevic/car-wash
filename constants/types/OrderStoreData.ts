import { ClientData } from "./ClientData";
import { Vehicle } from "./Vehicle";
import { Time } from "./Time";
import { Treatment } from "./Treatment";

export interface OrderStoreData {
  date: Date | null;
  vehicle: Vehicle | null;
  treatment: Treatment | null;
  startTime: Time | null;
  client: ClientData | null;
}
