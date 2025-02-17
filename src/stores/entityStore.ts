import {create} from 'zustand';
import {Configuration, Entity, EntityApi} from "@voidforgeorg/universe-client";
import {useSolarSystemStore} from "./index.ts";

interface EntityState {
    entities: Entity[];
    fetchEntities: (userId: string) => void;
}


const useEntityStore = create<EntityState>((set) => ({
    entities: [],
    fetchEntities: async (userId) => {
        const configuration = new Configuration({
            basePath: `${import.meta.env.VITE_UNIVERSE_CLIENT_HOST}:${import.meta.env.VITE_UNIVERSE_CLIENT_PORT}`
        })
        const client = new EntityApi(configuration);
        console.log("Fetching entities for user: " + userId);
        let hasMore = true;
        let page = 0;
        while (hasMore) {
            const response = await client.entityGetEntities({
                xPagination: {page: page},
                ownedByPlayerId: userId
            });
            const entitiesPaged = response.data || [];
            const entities = entitiesPaged.items || [];
            for (const entity of entities) {
                const solarSystemStore = useSolarSystemStore.getState();
                solarSystemStore.fetchSolarSystem(entity.solarSystemId!);
            }
            set((state) => {
                return {
                    entities: [...state.entities, ...entities]
                }
            })
            hasMore = entitiesPaged.pagingMetadata
                && entitiesPaged.pagingMetadata
                && entitiesPaged.pagingMetadata.hasNext || false;
            page++;
        }
    }
}))

export default useEntityStore;