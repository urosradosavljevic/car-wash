import { observable, action } from "mobx"
import { Vehicle } from "../constants/types/Vehicle";
import { ClientData } from "../constants/types/ClientData";
import { Time } from "../constants/types/Time";
import { OrderStoreData } from "../constants/types/OrderStoreData";
import { Treatment } from "../constants/types/Treatment";


const initial = {
    date: new Date(),
    vehicle: null,
    treatment: null,
    startTime: null,
    client: null,
}

class OrderStore {
    constructor(initialData: OrderStoreData = initial) {
        this.date = initialData.date;
        this.vehicle = initialData.vehicle;
        this.treatment = initialData.treatment;
        this.startTime = initialData.startTime;
        this.client = initialData.client;
    }

    @observable
    date: Date | null;

    changeDate = (d: Date) => this.date = d

    @observable
    vehicle: Vehicle | null;

    @observable
    treatment: Treatment | null;

    @observable
    startTime: Time | null;

    @observable
    client: ClientData | null;
}


export default OrderStore;