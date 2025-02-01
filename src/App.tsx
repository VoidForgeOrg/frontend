import './App.css'
import {
    AppBar, Avatar,
    Box, Button,
    createTheme, CssBaseline,
    CSSObject, IconButton,
    List,
    ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem,
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
import {useAuth} from "react-oidc-context";
import * as React from "react";

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

    const auth = useAuth();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    switch (auth.activeNavigator) {
        case "signinSilent":
            return <div>Signing you in...</div>;
        case "signoutRedirect":
            return <div>Signing you out...</div>;
    }

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Oops... {auth.error.message}</div>;
    }


    if (!auth.isAuthenticated) {
        return <button onClick={() => void auth.signinRedirect()}>Log in</button>
    }

    return (
        <ThemeProvider theme={darkTheme}>

            <Box sx={{ display: 'flex' }}>
                <CssBaseline/>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
                            <Button onClick={handleMenu}>
                                <Avatar />
                                <Typography variant="h6">
                                    {auth.user?.profile.name}
                                </Typography>
                            </Button>
                            <Menu
                                id="user-menu"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                >
                                <MenuItem onClick={() => {
                                    void auth.removeUser()
                                }}>Logout</MenuItem>
                            </Menu>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar/>
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

                <Stack direction="row" spacing={2}>


                    <Box>
                        {selectedIndex === 0 && <Welcome/>}
                        {selectedIndex === 1 && <PlanetsMenu/>}
                    </Box>
                </Stack>
            </Box>


        </ThemeProvider>
    )
}

export default App