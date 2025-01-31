import {Card, Divider, Stack, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2"

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
                <Card>
                    Planet
                </Card>
                <Card>
                    Planet
                </Card>
                <Card>
                    Planet
                </Card>
            </Grid>
        </Stack>
    )
}


export default PlanetsMenu