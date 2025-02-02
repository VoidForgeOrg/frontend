import {Segment, SolarSystem} from "../clients/universe";

const getSolarSystemById = (solarSystems: SolarSystem[], id: string) => {
    return solarSystems.find(solarSystem => solarSystem.id === id);
}

const getSegmentById = (segments: Segment[], id: string) => {
    return segments.find(segment => segment.id === id);
}

const getSegmentBySolarSystemId = (segments: Segment[], solarSystems: SolarSystem[],solarSystemId: string) => {
    const solarSystem = getSolarSystemById(solarSystems, solarSystemId);
    return solarSystem ? getSegmentById(segments, solarSystem.segmentId!) : undefined;
}

export {getSolarSystemById, getSegmentById, getSegmentBySolarSystemId};