import {Autocomplete, Button, Checkbox, Divider, Stack, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2"
import EntityCard from "./planetCard/EntityCard.tsx";
import {useEffect, useMemo, useState} from "react";

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SearchIcon from '@mui/icons-material/Search';
import useEntityStore from "../../stores/entityStore.ts";
import useSegmentStore from "../../stores/segmentsStore.ts";
import useSolarSystemStore from "../../stores/solarSystemStore.ts";
import {getSegmentById, getSegmentBySolarSystemId, getSolarSystemById} from "../../utils/universeHelpers.ts";

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

type PlanetsMenuProps = {
    playerSub: string;
}


const PlanetsMenu = (props: PlanetsMenuProps) => {


    const fetchEntities = useEntityStore(state => state.fetchEntities);
    const planets = useEntityStore(state => state.entities);
    const segments = useSegmentStore(state => state.segments);
    const solarSystems = useSolarSystemStore(state => state.solarSystems);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
    const [selectedSolarSystems, setSelectedSolarSystems] = useState<string[]>([]);

    useEffect(() => {
        fetchEntities("");
    }, [fetchEntities, props.playerSub]);


    const filteredPlanets = useMemo(() =>
            planets.filter(planet => {
                const solarSystem = planet.solarSystemId
                    ? getSolarSystemById(solarSystems, planet.solarSystemId)
                    : undefined;
                console.log("Getting solar system for planet: " + planet.name + " and got: " + solarSystem);
                const segment = solarSystem?.segmentId
                    ? getSegmentById(segments, solarSystem.segmentId)
                    : undefined;
                console.log("Getting segment for planet: " + planet.name + " and got: " + segment);
                // Check if current planet matches all filters
                const matchesSearch = planet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
                const matchesSegments = selectedSegments.length === 0
                    || (segment?.name && selectedSegments.includes(segment.name));
                const matchesSolarSystems = selectedSolarSystems.length === 0
                    || (solarSystem?.name && selectedSolarSystems.includes(solarSystem.name));

                return matchesSearch && matchesSegments && matchesSolarSystems;
            }),
        [planets, searchTerm, segments, selectedSegments, selectedSolarSystems, solarSystems]);


    const filteredSolarSystems = useMemo(() =>
            solarSystems.filter(solarSystem => {
                const segment = getSegmentById(segments, solarSystem.segmentId!);
                console.log("Getting segment for solar system: " + solarSystem.name + " and got: " + segment);
                return selectedSegments.length === 0 || selectedSegments.includes(segment!.name!);
            }),
        [segments, selectedSegments, solarSystems]
    );

    return (
        <Stack spacing={2}>
            <Stack direction={"row"} spacing={2}>
                <TextField label={"Search"} variant={"outlined"} value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}/>
                <Autocomplete multiple
                              id="segment-selector"
                              options={segments}
                              disableCloseOnSelect
                              limitTags={2}
                              getOptionLabel={(option) => option.name!}
                              renderOption={(props, option, {selected}) => {
                                  const {key, ...optionProps} = props;
                                  return (
                                      <li key={key} {...optionProps}>
                                          <Checkbox
                                              icon={icon}
                                              checkedIcon={checkedIcon}
                                              style={{marginRight: 8}}
                                              checked={selected}
                                          />
                                          {option.name!}
                                      </li>
                                  )
                              }}
                              style={{width: 325}}
                              onChange={(_e, value) => setSelectedSegments(value.map(segment => segment.name!))}
                              renderInput={(params) => (<TextField {...params} label="Segments"/>)}
                />

                <Autocomplete multiple
                              id="solar-system-selector"
                              options={filteredSolarSystems}
                              disableCloseOnSelect
                              limitTags={2}
                              getOptionLabel={(option) => option.name!}
                              renderOption={(props, option, {selected}) => {
                                  const {key, ...optionProps} = props;
                                  return (
                                      <li key={key} {...optionProps}>
                                          <Checkbox
                                              icon={icon}
                                              checkedIcon={checkedIcon}
                                              style={{marginRight: 8}}
                                              checked={selected}
                                          />
                                          {option.name}
                                      </li>
                                  )
                              }}
                              style={{width: 325}}
                              onChange={(_e, value) => setSelectedSolarSystems(value.map(solarSystem => solarSystem.name!))}
                              renderInput={(params) => (<TextField {...params} label="Solar Systems"/>)}
                />
                <Button disabled variant="outlined" startIcon={<SearchIcon/>}>Advanced Filter (Coming soon)</Button>
            </Stack>
            <Divider/>
            <Grid container spacing={2}>
                {filteredPlanets.map(planet => (
                    <EntityCard entity={planet} key={planet.id}
                                solarSystemName={getSolarSystemById(solarSystems, planet.solarSystemId!)?.name ?? ""}
                                segmentName={getSegmentBySolarSystemId(segments, solarSystems, planet.solarSystemId!)?.name ?? ""}
                    />
                ))}
            </Grid>
        </Stack>
    )
}


export default PlanetsMenu