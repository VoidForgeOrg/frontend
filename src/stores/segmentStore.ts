import {create} from 'zustand';
import {Segment} from "@voidforgeorg/universe-client";
import UniverseClient from "../services/universeService.ts";

interface SegmentState {
    segments: Segment[];
    fetchSegment: (id: string) => void;
    clearSegments: () => void;
}

const useSegmentStore = create<SegmentState>((set) => ({
    segments: [],
    fetchSegment: async (id: string) => {
        try {
            console.log("Fetching segment: " + id);
            const api = UniverseClient.getInstance().getSegmentApi();
            const segmentResponse = await api.segmentGetSegment({id});
            const segment = segmentResponse.data;

            set((state) => ({
                segments: [
                    ...state.segments.filter(s => s.id !== segment.id),
                    segment
                ]
            }))
        } catch (error) {
            console.error("Error fetching segment:", error);
        }
    },
    clearSegments: () => {
        set({segments: []});
    }
}))

export default useSegmentStore;