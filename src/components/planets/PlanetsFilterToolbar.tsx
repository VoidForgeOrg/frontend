import {Button, Stack, TextField} from "@mui/material";
import PlanetsFilter from "./PlanetsFilter.tsx";
import SearchIcon from "@mui/icons-material/Search";
import {Segment, SolarSystem} from "../../clients/universe";

interface PlanetsFilterToolbarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedSegments: string[];
    onSegmentsChange: (values: string[]) => void;
    selectedSolarSystems: string[];
    onSolarSystemsChange: (values: string[]) => void;
    segments: Segment[];
    solarSystems: SolarSystem[];
}

const PlanetsFilterToolbar = ({
                                  searchTerm,
                                  onSearchChange,
                                  onSegmentsChange,
                                  selectedSegments,
                                  onSolarSystemsChange,
                                  selectedSolarSystems,
                                  solarSystems,
                                  segments
                              }: PlanetsFilterToolbarProps) => {
    return (
        <Stack direction={"row"} spacing={2}>
            <TextField
                label={"Search"}
                variant={"outlined"}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}/>

            <PlanetsFilter
                id="segment-filter"
                options={segments}
                selectedValues={selectedSegments}
                onChange={(values) => onSegmentsChange(values)}
                label="Segments"
            />

            <PlanetsFilter
                id="solar-system-selector"
                options={solarSystems}
                selectedValues={selectedSolarSystems}
                onChange={(values) => onSolarSystemsChange(values)}
                label="Solar Systems"
            />

            <Button disabled variant="outlined" startIcon={<SearchIcon/>}>Advanced Filter (Coming soon)</Button>
        </Stack>
    )
}

export default PlanetsFilterToolbar;
