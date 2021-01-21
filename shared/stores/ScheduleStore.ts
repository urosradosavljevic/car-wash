import { action, makeObservable, observable } from "mobx";
import { Appointement } from "../../models/Appointement";

import { ClientData } from "../../models/ClientData";
import { BusinessHours, Time } from "../../models/Time";
import { Treatment } from "../../models/Treatment";
import { Vehicle } from "../../models/Vehicle";
import { businessHours, day as pseudoSelectedDay } from "../data/days";
import { RootStore } from "./RootStore";


export type ScheduleStoreHydration = {
    businessHours: BusinessHours;
    date: Date;
    vehicle: Vehicle;
    treatment: Treatment;
    startTime: Time;
    client: ClientData;
}

export class ScheduleStore {
    root: RootStore;

    date: Date = new Date();
    vehicle: Vehicle = Vehicle.car;
    treatment: Treatment = Treatment.outside;
    startTime: Time | undefined;
    businessHours: BusinessHours = { open: 9, closed: 9 };
    selectedDaySchedule: Array<Appointement> = [];
    client: ClientData | undefined;

    constructor(root: RootStore) {
        this.root = root;
        this.fetchBusinessHours();
        makeObservable(this, {
            date: observable,
            vehicle: observable,
            treatment: observable,
            startTime: observable,
            businessHours: observable,
            selectedDaySchedule: observable,
            client: observable,
            setDate: action,
            setVehicle: action,
            setTreatment: action,
            setStartTime: action,
            setClient: action,

        })
    }

    setDate = (date: Date) => {
        this.date = date
        this.fetchDaySchedule()
    }

    fetchBusinessHours = () => {
        // fetch day schedule from db
        // const response = fetchBusinessHours()
        // const {businessHours} = response
        // this.businessHours = businessHours
        this.businessHours = businessHours
    }

    fetchDaySchedule = () => {
        // fetch day schedule from db
        // const response = fetchScheduleForDay(this.date)
        // const {schedule} = response
        // this.selectedDaySchedule = schedule
        console.log("selectedDaySchedule fetched")
        this.selectedDaySchedule = pseudoSelectedDay
    }

    setVehicle = (vehicle: Vehicle) => {
        this.vehicle = vehicle
    }

    setTreatment = (treatment: Treatment) => {
        this.treatment = treatment
    }

    setStartTime = (startTime: Time) => {
        this.startTime = startTime
    }

    setClient = (client: ClientData) => {
        this.client = client
    }

    hydrate(data?: ScheduleStoreHydration) {
        if (data) {
            this.businessHours = data.businessHours;
            this.date = data.date;
            this.vehicle = data.vehicle;
            this.treatment = data.treatment;
            this.startTime = data.startTime;
            this.client = data.client;
        }
    }
}
