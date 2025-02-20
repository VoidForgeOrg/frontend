import {Divider, Stack, CircularProgress, Typography, Skeleton} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EntityCard from "./planetCard/EntityCard.tsx";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useUniverseHelpers } from "../../utils";
import PlanetsFilterToolbar from "./PlanetsFilterToolbar.tsx";
import { useAuth } from "react-oidc-context";
import { useEntityStore, useSegmentStore, useSolarSystemStore } from "../../stores";
import {ENTITY_CARD_HEIGHT, ENTITY_CARD_WIDTH} from "./planetCard/EntityCardSizes.ts";

const PlanetsMenu = () => {
    const auth = useAuth();
    const universeHelpers = useUniverseHelpers();

    const {
        entities: planets,
        fetchEntities,
        isLoading,
        error,
        clearEntities
    } = useEntityStore();

    const segments = useSegmentStore(state => state.segments);
    const solarSystems = useSolarSystemStore(state => state.solarSystems);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
    const [selectedSolarSystems, setSelectedSolarSystems] = useState<string[]>([]);

    const loadEntities = useCallback(async () => {
        const userId = auth.user?.profile.sub || "undefined";
        try {
            await fetchEntities(userId);
        } catch (err) {
            console.error("Failed to load entities:", err);
        }
    }, [fetchEntities, auth.user?.profile.sub]);

    useEffect(() => {
        (async () => {
            await loadEntities();
        })();

        return () => {
            clearEntities();
        };
    }, [loadEntities, clearEntities]);

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

    if (isLoading && planets.length === 0) {
        return (
            <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ minHeight: 400 }}>
                <CircularProgress />
                <Typography>Loading planets...</Typography>
            </Stack>
        );
    }

    if (error && planets.length === 0) {
        return (
            <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ minHeight: 400 }}>
                <Typography color="error">
                    Failed to load planets: {error}
                </Typography>
            </Stack>
        );
    }

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
            {filteredPlanets.length === 0 ? (
                    searchTerm !== "" || selectedSegments.length > 0 || selectedSolarSystems.length > 0 ? (
                        <Typography align="center" sx={{ py: 4 }}>
                            No planets match the current filters
                        </Typography>
                    ) : (
                        <Typography align="center" sx={{ py: 4 }}>
                            No planets found
                        </Typography>
                    )

            ) : (
                <Grid container spacing={2}>
                    {isLoading
                        ?
                        Array.from({length: 10}).map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                width={ENTITY_CARD_WIDTH}
                                height={ENTITY_CARD_HEIGHT}
                            />
                        ))
                        :
                        filteredPlanets.map(planet => (
                            <EntityCard entity={planet} key={planet.id}/>
                        ))}
                </Grid>
            )}
        </Stack>
    );
};

export default PlanetsMenu;