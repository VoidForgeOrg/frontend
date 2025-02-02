import {Divider, Stack} from "@mui/material";
import Grid from "@mui/material/Grid2"
import EntityCard from "./planetCard/EntityCard.tsx";
import {useEffect, useMemo, useState} from "react";

import useEntityStore from "../../stores/entityStore.ts";
import useSegmentStore from "../../stores/segmentsStore.ts";
import useSolarSystemStore from "../../stores/solarSystemStore.ts";
import {useUniverseHelpers} from "../../utils/universeHelpers.ts";
import PlanetsFilterToolbar from "./PlanetsFilterToolbar.tsx";
import {useAuth} from "react-oidc-context";

const PlanetsMenu = () => {

    const auth = useAuth();
    const universeHelpers = useUniverseHelpers();
    const fetchEntities = useEntityStore(state => state.fetchEntities);

    const planets = useEntityStore(state => state.entities);
    const segments = useSegmentStore(state => state.segments);
    const solarSystems = useSolarSystemStore(state => state.solarSystems);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
    const [selectedSolarSystems, setSelectedSolarSystems] = useState<string[]>([]);

    useEffect(() => {
        if (auth.user?.profile.sub || false) {
            fetchEntities(auth.user.profile.sub);
        } else {
            fetchEntities("");
        }
    }, [auth.user?.profile.sub, fetchEntities]);

    const filteredPlanets = useMemo(() =>
            universeHelpers.filterEntitiesByLocation(
                planets,
                searchTerm,
                selectedSegments,
                selectedSolarSystems
            ),
        [planets, searchTerm, selectedSegments, selectedSolarSystems, universeHelpers]
    );

    const filteredSolarSystems = useMemo(() =>
            solarSystems.filter(solarSystem => {
                const segment = universeHelpers.getSegmentById(solarSystem.segmentId!);
                return selectedSegments.length === 0 ||
                    (segment?.name && selectedSegments.includes(segment.name));
            }),
        [solarSystems, selectedSegments, universeHelpers]
    );

    return (
        <Stack spacing={2}>
            <PlanetsFilterToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedSegments={selectedSegments}
                onSegmentsChange={setSelectedSegments}
                selectedSolarSystems={selectedSolarSystems}
                onSolarSystemsChange={setSelectedSolarSystems}
                segments={segments}
                solarSystems={filteredSolarSystems}
            />
            <Divider/>
            <Grid container spacing={2}>
                {filteredPlanets.map(planet => (
                    <EntityCard entity={planet} key={planet.id}/>
                ))}
            </Grid>
        </Stack>
    )
}


export default PlanetsMenu