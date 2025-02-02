import {create} from 'zustand';
import {SolarSystem} from "../clients/universe";
import useSegmentStore from "./segmentsStore.ts";
import {useClientStore} from "./clientStore.ts";

interface SolarSystemState {
    solarSystems: SolarSystem[];
    fetchSolarSystem: (gid: string) => void;
}

const useSolarSystemStore = create<SolarSystemState>((set) => ({
    solarSystems: [],
    solarSystemMap: new Map(),
    fetchSolarSystem: async (gid: string) => {
        console.log("Fetching solar system: " + gid);
        const client = useClientStore.getState().client;
        const solarSystem = await client.solarSystem.solarSystemGetSolarSystem(gid);
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