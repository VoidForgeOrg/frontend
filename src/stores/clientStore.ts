import {create} from 'zustand';
import {UniverseClient} from "../clients/universe";

// Singleton client instance
const universeClient = new UniverseClient({
    BASE: "http://localhost:40000"
});

interface ClientState {
    client: UniverseClient;
}

export const useClientStore = create<ClientState>(() => ({
    client: universeClient,
}));
