import './App.css'
import {
    AppBar,
    Avatar, Box,
    createTheme,
    List,
    ListItem, ListItemButton, ListItemIcon, ListItemText,
    Stack,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import Welcome from "./components/welcome/Welcome.tsx";
import {useState} from "react";
import PlanetsMenu from "./components/planets/PlanetsMenu.tsx";

import PublicIcon from '@mui/icons-material/Public';
import BiotechIcon from '@mui/icons-material/Biotech';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {

    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <ThemeProvider theme={darkTheme}>

            <Stack spacing={2}>
                <AppBar position="static">
                    <Toolbar sx={{justifyContent: 'space-between'}}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar/>
                            <Typography variant="h6">
                                Unknown
                            </Typography>
                        </Stack>
                    </Toolbar>
                </AppBar>

                <Stack direction="row" spacing={2}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton selected={selectedIndex === 1} onClick={() => setSelectedIndex(1)}>
                                <ListItemIcon>
                                    <PublicIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Planets"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton selected={selectedIndex === 2} onClick={() => setSelectedIndex(2)}>
                                <ListItemIcon>
                                    <BiotechIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Research (Coming soon)"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton selected={selectedIndex === 3} onClick={() => setSelectedIndex(3)}>
                                <ListItemIcon>
                                    <RocketLaunchIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Fleet (Coming soon)"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton selected={selectedIndex === 4} onClick={() => setSelectedIndex(4)}>
                                <ListItemIcon>
                                    <SatelliteAltIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Exploration (Coming soon)"}/>
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <Box>
                        {selectedIndex === 0 && <Welcome/>}
                        {selectedIndex === 1 && <PlanetsMenu/>}
                    </Box>
                </Stack>
            </Stack>


        </ThemeProvider>
    )
}

export default App