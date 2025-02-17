import {useMemo} from 'react';
import {Entity, Segment, SolarSystem} from "@voidforgeorg/universe-client";
import useSegmentStore from '../stores/segmentStore.ts';
import useSolarSystemStore from '../stores/solarSystemStore';

type EntityLocation = {
    solarSystem?: SolarSystem;
    segment?: Segment;
};

export function useUniverseHelpers() {
    const segments = useSegmentStore(state => state.segments);
    const solarSystems = useSolarSystemStore(state => state.solarSystems);

    const solarSystemsMap = useMemo(() =>
            new Map(solarSystems.map(system => [system.id!, system])),
        [solarSystems]
    );

    const segmentsMap = useMemo(() =>
            new Map(segments.map(segment => [segment.id!, segment])),
        [segments]
    );

    return useMemo(() => ({
        getSolarSystemById(id: string): SolarSystem | undefined {
            return solarSystemsMap.get(id);
        },

        getSegmentById(id: string): Segment | undefined {
            return segmentsMap.get(id);
        },

        getSegmentBySolarSystemId(solarSystemId: string): Segment | undefined {
            const solarSystem = this.getSolarSystemById(solarSystemId);
            return solarSystem?.segmentId
                ? this.getSegmentById(solarSystem.segmentId)
                : undefined;
        },

        getEntityLocation(entity: Entity): EntityLocation {
            const solarSystem = entity.solarSystemId
                ? this.getSolarSystemById(entity.solarSystemId)
                : undefined;

            const segment = solarSystem?.segmentId
                ? this.getSegmentById(solarSystem.segmentId)
                : undefined;

            return {solarSystem, segment};
        },

        filterEntitiesByLocation(
            entities: Entity[],
            searchTerm: string = "",
            selectedSegments: string[] = [],
            selectedSolarSystems: string[] = []
        ) {
            return entities.filter(entity => {
                const {solarSystem, segment} = this.getEntityLocation(entity);

                const matchesSearch = entity.name?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ?? false;

                const matchesSegments = selectedSegments.length === 0
                    || (segment?.name && selectedSegments.includes(segment.name));

                const matchesSolarSystems = selectedSolarSystems.length === 0
                    || (solarSystem?.name && selectedSolarSystems.includes(solarSystem.name));

                return matchesSearch && matchesSegments && matchesSolarSystems;
            });
        }
    }), [segmentsMap, solarSystemsMap]);
}