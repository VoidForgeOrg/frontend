import { create } from 'zustand';
import {Entity, PagedListOfEntity} from "@voidforgeorg/universe-client";
import UniverseClient from "../services/universeService.ts";
import useSolarSystemStore from "./solarSystemStore.ts";

interface EntityState {
    entities: Entity[];
    isLoading: boolean;
    error: string | null;
    fetchEntities: (userId: string) => Promise<void>;
    clearEntities: () => void;
}

const useEntityStore = create<EntityState>((set) => ({
    entities: [],
    isLoading: false,
    error: null,

    fetchEntities: async (userId: string) => {
        set({ entities: [], isLoading: true, error: null });

        const api = UniverseClient.getInstance().getEntityApi();
        console.log(`Fetching entities for user: ${userId}`);

        let hasMore = true;
        let page = 0;
        let allEntities: Entity[] = [];

        try {
            while (hasMore) {
                const response = await api.entityGetEntities({
                    xPagination: { page },
                    ownedByPlayerId: userId
                });

                const paginatedData = response.data as PagedListOfEntity;
                const newEntities = paginatedData?.items || [];

                allEntities = [...allEntities, ...newEntities];

                const solarSystemPromises = newEntities.map(entity =>
                    entity.solarSystemId ?
                        useSolarSystemStore.getState().fetchSolarSystem(entity.solarSystemId) :
                        Promise.resolve()
                );

                await Promise.all(solarSystemPromises);

                hasMore = Boolean(
                    paginatedData?.pagingMetadata?.hasNext
                );

                page++;
            }

            set({ entities: allEntities, isLoading: false });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`Error fetching entities: ${errorMessage}`);
            set({ error: errorMessage, isLoading: false });
        }
    },

    clearEntities: () => set({ entities: [], error: null })
}));

export default useEntityStore;