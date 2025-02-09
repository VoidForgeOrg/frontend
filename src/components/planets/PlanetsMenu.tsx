import {Avatar, Divider, FormControlLabel, Stack, Switch} from "@mui/material";
import Grid from "@mui/material/Grid2"
import EntityCard from "./planetCard/EntityCard.tsx";
import {useEffect, useMemo, useState} from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import planetImage from "./planetCard/planet.jpg";

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
    const [tableView, setTableView] = useState(false); // Toggle between Stack and Table view

    useEffect(() => {
        if (auth.user?.profile.sub || false) {
            fetchEntities(/*auth.user.profile.sub*/"");
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
    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1},
        { field: "type", headerName: "Type", flex: 1 },
        { field: "ownedBy", headerName: "Owned By", flex: 1},
        { field: "segment", headerName: "Segment", flex: 1},
        { field: "solarSystem", headerName: "Solar System", flex: 1 },
        {
            field: "image",
            headerName: "Image",
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>

                <Avatar
                    src={params.value}
                    alt="Planet"
                    sx={{ width: 100, height: 40, borderRadius: 2, alignSelf: "center" }}
                />
                </div>
            )
        },
    ];
    const tableData = filteredPlanets.map(planet => ({
        id  : planet.id,
        name: planet.name,
        type: planet.$type,
        ownedBy: planet.ownedBy,
        segment: universeHelpers.getEntityLocation(planet).segment?.name || "Unknown",
        solarSystem: universeHelpers.getEntityLocation(planet).solarSystem?.name || "Unknown",
        image: planetImage
    }));

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
            <FormControlLabel
                control={
                    <Switch checked={tableView} onChange={() => setTableView(!tableView)} />
                }
                label="Table View"
            />
            <Divider/>
            {tableView ? (
                <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={tableData}
                        columns={columns}
                        pageSizeOptions={[5, 10, 20]}
                        autoPageSize
                        disableRowSelectionOnClick
                    />
                </div>
            ) : (
            <Grid container spacing={2}>
                {filteredPlanets.map(planet => (
                    <EntityCard entity={planet} key={planet.id}/>
                ))}
            </Grid>
                )};
        </Stack>
    )
}


export default PlanetsMenu
