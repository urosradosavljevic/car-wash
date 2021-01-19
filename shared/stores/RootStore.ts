import { ScheduleStore, ScheduleStoreHydration } from "./ScheduleStore";

export type RootStoreHydration = {
    scheduleStore?: ScheduleStoreHydration;
};

export class RootStore {
    scheduleStore: ScheduleStore;

    constructor() {
        this.scheduleStore = new ScheduleStore(this);
    }

    hydrate(data: RootStoreHydration) {
        if (data.scheduleStore) {
            this.scheduleStore.hydrate(data.scheduleStore);
        }
    }
}