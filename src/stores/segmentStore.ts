import {create} from 'zustand';
import {Configuration, Segment, SegmentApi} from "@voidforgeorg/universe-client";

interface SegmentState {
    segments: Segment[];
    fetchSegment: (id: string) => void;
}

const useSegmentStore = create<SegmentState>((set) => ({
    segments: [],
    fetchSegment: async (id: string) => {
        console.log("Fetching segment: " + id);
        const configuration = new Configuration({
            basePath: "http://localhost:40000"
        })
        const client = new SegmentApi(configuration);
        const segmentResponse = await client.segmentGetSegment({id});
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