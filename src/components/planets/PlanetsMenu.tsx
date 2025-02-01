import {Autocomplete, Button, Checkbox, Divider, Stack, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2"
import EntityCard from "./planetCard/EntityCard.tsx";
import {useState} from "react";

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SearchIcon from '@mui/icons-material/Search';

type Segment = {
    name: string;
}

type SolarSystem = {
    name: string;
    segment: Segment;
}

export type Entity = {
    name: string;
    solarSystem: SolarSystem;
}

const segments: Segment[] = [
    {name: "Terran"},
    {name: "Arkhanis"},
]

const solarSystems: SolarSystem[] = [
    {name: "Sol", segment: segments[0]},
    {name: "Khar", segment: segments[0]},
    {name: "Tatoo", segment: segments[1]},
]

const planets: Entity[] = [
    {name: "Earth", solarSystem: solarSystems[0]},
    {name: "Mars", solarSystem: solarSystems[0]},
    {name: "Azeroth", solarSystem: solarSystems[1]},
    {name: "Tatooine", solarSystem: solarSystems[2]},
]

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

const PlanetsMenu = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
    const [selectedSolarSystems, setSelectedSolarSystems] = useState<string[]>([]);

    const filteredPlanets = planets.filter(planet => {
        return planet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedSegments.length === 0 || selectedSegments.includes(planet.solarSystem.segment.name)) &&
            (selectedSolarSystems.length === 0 || selectedSolarSystems.includes(planet.solarSystem.name));
    });

    const filteredSolarSystems = solarSystems.filter(solarSystem => {
        return selectedSegments.length === 0 || selectedSegments.includes(solarSystem.segment.name);
    });

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
                              getOptionLabel={(option) => option.name}
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
                              onChange={(_e, value) => setSelectedSegments(value.map(segment => segment.name))}
                              renderInput={(params) => (<TextField {...params} label="Segments"/>)}
                />

                <Autocomplete multiple
                              id="solar-system-selector"
                              options={filteredSolarSystems}
                              disableCloseOnSelect
                              limitTags={2}
                              getOptionLabel={(option) => option.name}
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
                              onChange={(_e, value) => setSelectedSolarSystems(value.map(solarSystem => solarSystem.name))}
                              renderInput={(params) => (<TextField {...params} label="Solar Systems"/>)}
                />
                <Button disabled variant="outlined" startIcon={<SearchIcon/>}>Advanced Filter (Coming soon)</Button>
            </Stack>
            <Divider/>
            <Grid container spacing={2}>
                {filteredPlanets.map(planet => (
                    <EntityCard entity={planet} key={planet.name}/>
                ))}
            </Grid>
        </Stack>
    )
}


export default PlanetsMenu