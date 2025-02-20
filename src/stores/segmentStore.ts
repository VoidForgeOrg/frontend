import {create} from 'zustand';
import {Segment} from "@voidforgeorg/universe-client";
import UniverseClient from "../services/universeService.ts";

interface SegmentState {
    segments: Segment[];
    fetchSegment: (id: string) => void;
}

const useSegmentStore = create<SegmentState>((set) => ({
    segments: [],
    fetchSegment: async (id: string) => {
        console.log("Fetching segment: " + id);
        const api = UniverseClient.getInstance().getSegmentApi();
        const segmentResponse = await api.segmentGetSegment({id});
        const segment = segmentResponse.data;

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