import {Divider, Stack, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2"
import PlanetCard from "./planetCard/PlanetCard.tsx";

const PlanetsMenu = () => {

    return (
        <Stack spacing={2}>
            <Stack direction={"row"} spacing={2}>
                <TextField label={"Search"} variant={"outlined"}/>
                <TextField label={"Sectors"} variant={"outlined"}/>
                <TextField label={"Solar Systems"} variant={"outlined"}/>
            </Stack>
            <Divider/>
            <Grid container spacing={2}>
                <PlanetCard planet={{name: "Earth"}}/>
                <PlanetCard planet={{name: "Mars"}}/>
                <PlanetCard planet={{name: "Jupiter"}}/>
                <PlanetCard planet={{name: "Saturn"}}/>
                <PlanetCard planet={{name: "Uranus"}}/>
                <PlanetCard planet={{name: "Neptune"}}/>
                <PlanetCard planet={{name: "Pluto"}}/>
            </Grid>
        </Stack>
    )
}


export default PlanetsMenu