import { observable, action } from "mobx"
// import { useStaticRendering } from "mobx-react";

import { OrderStoreData } from "../constants/types/OrderStoreData";
import { ClientData } from "../constants/types/ClientData";
import { Vehicle } from "../constants/types/Vehicle";
import { Time } from "../constants/types/Time";
import { Treatment } from "../constants/types/Treatment";

const initial = {
    date: null,
    vehicle: null,
    treatment: null,
    startTime: null,
    client: null,
}

class OrderStore {
    @observable
    date!: Date | null;

    @observable
    vehicle!: Vehicle | null;

    @observable
    treatment!: Treatment | null;

    @observable
    startTime!: Time | null;

    @observable
    client!: ClientData | null;

    @action
    setDate = (date: Date) => {
        this.date = date
    }

    @action
    setVehicle = (vehicle: Vehicle) => {
        this.vehicle = vehicle
    }

    @action
    setTreatment = (treatment: Treatment) => {
        this.treatment = treatment
    }

    @action
    setStartTime = (startTime: Time) => {
        this.startTime = startTime
    }

    @action
    setClient = (client: ClientData) => {
        this.client = client
    }

    hydrate(initialData: OrderStoreData = initial) {
        this.date = initialData.date;
        this.vehicle = initialData.vehicle;
        this.treatment = initialData.treatment;
        this.startTime = initialData.startTime;
        this.client = initialData.client;
    }
}


export default OrderStore;