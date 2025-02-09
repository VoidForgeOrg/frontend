import {Divider, Skeleton, Stack} from "@mui/material";
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadEntities = async () => {
            try {
                const userId = auth.user?.profile.sub || "";
                await fetchEntities(userId);
                // await new Promise(resolve => setTimeout(resolve, 5000));
            } catch (error) {
                console.error("Error fetching entities:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadEntities();
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
                {isLoading
                    ?
                    Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            width={240}
                            height={270}
                        />
                    ))
                    :
                    filteredPlanets.map(planet => (
                        <EntityCard entity={planet} key={planet.id} />
                    ))}
            </Grid>
        </Stack>
    )
}


export default PlanetsMenu
