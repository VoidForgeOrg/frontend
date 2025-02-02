import {create} from 'zustand';
import {Segment} from "../clients/universe";
import {useClientStore} from "./clientStore.ts";

interface SegmentState {
    segments: Segment[];
    fetchSegment: (id: string) => void;
}

const useSegmentStore = create<SegmentState>((set) => ({
    segments: [],
    fetchSegment: async (id: string) => {
        console.log("Fetching segment: " + id);
        const client = useClientStore.getState().client;
        const segment = await client.segment.segmentGetSegment(id);
        set((state) => {
            const exists = state.segments.find(s => s.id === segment.id);
            if (exists) {
                return state;
            }
            return {
                segments: [...state.segments, segment]
            }
        })
    }
}))

export default useSegmentStore;