import { ProgressStepStore, ProgressStepStoreHydration } from "./ProgressStepStore";
import { ScheduleStore, ScheduleStoreHydration } from "./ScheduleStore";
import { UIStore, UIStoreHydration } from "./UIStoreMobX6";

export type RootStoreHydration = {
    scheduleStore?: ScheduleStoreHydration;
    progressStepStore?: ProgressStepStoreHydration;
    uiStore?: UIStoreHydration;
};

export class RootStore {
    scheduleStore: ScheduleStore;
    uiStore: UIStore;
    progressStepStore: ProgressStepStore;

    constructor() {
        this.scheduleStore = new ScheduleStore(this);
        this.progressStepStore = new ProgressStepStore(this);
        this.uiStore = new UIStore(this);
    }

    hydrate(data: RootStoreHydration) {
        if (data.scheduleStore) {
            this.scheduleStore.hydrate(data.scheduleStore);
        }
        if (data.progressStepStore) {
            this.progressStepStore.hydrate(data.progressStepStore);
        }
        if (data.uiStore) {
            this.uiStore.hydrate(data.uiStore);
        }
    }
}