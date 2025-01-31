import './App.css'
import {
    AppBar,
    Avatar, Box,
    createTheme,
    CSSObject, IconButton,
    List,
    ListItem, ListItemButton, ListItemIcon, ListItemText,
    Stack, styled,
    Theme,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import Welcome from "./components/welcome/Welcome.tsx";
import {useState} from "react";
import PlanetsMenu from "./components/planets/PlanetsMenu.tsx";

import MuiDrawer from '@mui/material/Drawer';

import PublicIcon from '@mui/icons-material/Public';
import BiotechIcon from '@mui/icons-material/Biotech';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import MenuIcon from '@mui/icons-material/Menu';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


function App() {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = useState(false);

    return (
        <ThemeProvider theme={darkTheme}>

            <Stack spacing={2}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            size="large"
                            onClick={() => setOpen(!open)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar/>
                            <Typography variant="h6">
                                Unknown
                            </Typography>
                        </Stack>
                    </Toolbar>
                </AppBar>

                <Stack direction="row" spacing={2}>
                    <Drawer variant="permanent" open={open}>
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
                    </Drawer>

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