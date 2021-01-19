import { enableStaticRendering } from "mobx-react-lite";
import { createContext, ReactNode, useContext } from "react";
import { RootStore, RootStoreHydration } from "../stores/RootStore";

enableStaticRendering(typeof window === "undefined");

let store: RootStore;

const StoreContext = createContext<RootStore | undefined>(undefined);

export function useRootStore() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw new Error("useRootStore must be used within RootStoreProvider");
    }

    return context;
}

export function useUIStore() {
    const { uiStore } = useRootStore();
    return uiStore;
}

export function useProgressStepStore() {
    const { progressStepStore } = useRootStore();
    return progressStepStore;
}

type RootStoreProviderType = {
    children: ReactNode;
    hydrationData?: RootStoreHydration;
}

export function RootStoreProvider({ children, hydrationData }: RootStoreProviderType) {
    const store = initializeStore(hydrationData);

    return (<StoreContext.Provider value={store}>{children}</StoreContext.Provider>);
}

function initializeStore(initialData?: RootStoreHydration): RootStore {
    const _store = store ?? new RootStore();

    if (initialData) {
        _store.hydrate(initialData);
    }
    // For SSG and SSR always create a new store
    if (typeof window === "undefined") return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
}