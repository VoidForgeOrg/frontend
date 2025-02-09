import {create} from 'zustand';
import {Entity} from "../clients/universe";
import useSolarSystemStore from "./solarSystemStore.ts";
import {useClientStore} from "./clientStore.ts";

interface EntityState {
    entities: Entity[];
    loading: boolean;
    fetchEntities: (userId: string) => void;
}


const useEntityStore = create<EntityState>((set) => ({
    entities: [],
    loading: false,
    fetchEntities: async (userId) => {
        set({loading: true});
        try {
            console.log("Fetching entities for user: " + userId);
            const client = useClientStore.getState().client;
            const response = await client.entity.entityGetEntities(undefined, undefined,
                undefined, userId);
            const entities = response.items || [];
            const solarSystemStore = useSolarSystemStore.getState();
            for (const entity of entities) {
                solarSystemStore.fetchSolarSystem(entity.solarSystemId!);
            }
            set({entities: entities});
        }
        catch (error) {
            console.error("Error fetching entities:", error);
        }
        finally {
            set({loading: false});
        }
    }
}))

export default useEntityStore;
