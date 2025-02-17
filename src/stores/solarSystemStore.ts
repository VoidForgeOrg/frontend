import {create} from 'zustand';
import {Configuration, SolarSystem, SolarSystemApi} from "@voidforgeorg/universe-client";
import {useSegmentStore} from "./index.ts";

interface SolarSystemState {
    solarSystems: SolarSystem[];
    fetchSolarSystem: (gid: string) => void;
}

const useSolarSystemStore = create<SolarSystemState>((set) => ({
    solarSystems: [],
    solarSystemMap: new Map(),
    fetchSolarSystem: async (gid: string) => {
        console.log("Fetching solar system: " + gid);
        const configuration = new Configuration({
            basePath: `${import.meta.env.VITE_UNIVERSE_CLIENT_HOST}:${import.meta.env.VITE_UNIVERSE_CLIENT_PORT}`
        })
        const client = new SolarSystemApi(configuration);
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