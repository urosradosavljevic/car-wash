import { ClientData } from "../ClientData";
import { Vehicle } from "../Vehicle";
import { Time } from "../Time";
import { Treatment } from "../Treatment";

export interface OrderStoreData {
  date: Date;
  vehicle: Vehicle;
  treatment: Treatment;
  startTime: Time | null;
  client: ClientData | null;
}
