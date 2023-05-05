
import { createContext, useContext } from "react";
import CompetitionStore from "./CompetitionStore";

interface Store {
    competitionStore: CompetitionStore
}

export const store: Store = {
    competitionStore: new CompetitionStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}