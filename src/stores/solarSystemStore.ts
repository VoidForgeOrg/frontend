import {create} from 'zustand';
import {SolarSystem} from "@voidforgeorg/universe-client";
import UniverseClient from "../services/universeService.ts";
import useSegmentStore from "./segmentStore.ts";

interface SolarSystemState {
    solarSystems: SolarSystem[];
    fetchSolarSystem: (gid: string) => void;
    clearSolarSystems: () => void;
}

const useSolarSystemStore = create<SolarSystemState>((set) => ({
    solarSystems: [],
    fetchSolarSystem: async (gid: string) => {
        try {
            console.log("Fetching solar system: " + gid);
            const client = UniverseClient.getInstance().getSolarSystemApi();
            const solarSystemAxiosResponse = await client.solarSystemGetSolarSystem({id: gid});
            const solarSystem = solarSystemAxiosResponse.data;

            const segmentStore = useSegmentStore.getState();
            segmentStore.fetchSegment(solarSystem.segmentId!);

            set((state) => ({
                solarSystems: [
                    ...state.solarSystems.filter(s => s.id !== solarSystem.id),
                    solarSystem
                ]
            }));
        } catch (error) {
            console.error("Error fetching solar system:", error);
        }
    },
    clearSolarSystems: () => {
        set({solarSystems: []});
    }
}))

export default useSolarSystemStore;