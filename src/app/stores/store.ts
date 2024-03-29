import { createContext, useContext } from "react";
import AppUserStore from "./appUserStore";
import CommonStore from "./commonStore";
import TenantStore from "./tenantStore";
import CurrentUserStore from "./currentUserStore";
import VenueStore from "./venueStore";

// base Mobx store
interface Store {
    commonStore: CommonStore;
    currentUserStore: CurrentUserStore;
    appUserStore: AppUserStore;
    tenantStore: TenantStore;
    venueStore: VenueStore
}

export const store: Store = {
    commonStore: new CommonStore(),
    currentUserStore: new CurrentUserStore(),
    appUserStore: new AppUserStore(),
    tenantStore: new TenantStore(),
    venueStore: new VenueStore()
}

export const StoreContext = createContext(store); 

export function useStore() { 
    return useContext(StoreContext);
}