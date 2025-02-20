import {create} from 'zustand';
import {SolarSystem} from "@voidforgeorg/universe-client";
import UniverseClient from "../services/universeService.ts";
import useSegmentStore from "./segmentStore.ts";

interface SolarSystemState {
    solarSystems: SolarSystem[];
    fetchSolarSystem: (gid: string) => void;
}

const useSolarSystemStore = create<SolarSystemState>((set) => ({
    solarSystems: [],
    solarSystemMap: new Map(),
    fetchSolarSystem: async (gid: string) => {
        console.log("Fetching solar system: " + gid);
        const client = UniverseClient.getInstance().getSolarSystemApi();
        const solarSystemAxiosResponse = await client.solarSystemGetSolarSystem({id: gid});
        const solarSystem = solarSystemAxiosResponse.data;
        const segmentStore = useSegmentStore.getState();
        segmentStore.fetchSegment(solarSystem.segmentId!);
        set((state) => {
            const exists = state.solarSystems.find(s => s.id === solarSystem.id);
            if (exists) {
                return state;
            }
            return {
                solarSystems: [...state.solarSystems, solarSystem]
            }
        })
    }
}))

export default useSolarSystemStore;