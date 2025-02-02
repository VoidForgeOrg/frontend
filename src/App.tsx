import './App.css'
import {
    AppBar, Avatar,
    Box, Button,
    createTheme, CssBaseline,
    CSSObject, IconButton,
    List,
    ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem,
    styled,
    Theme,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
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
import {MenuOpen} from "@mui/icons-material";
import ComingSoon from "./components/welcome/ComingSoon.tsx";

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


type menuItem = {
    name: string,
    icon: React.ElementType,
}

const menuItems: menuItem[] = [
    {name: "Planets", icon: PublicIcon},
    {name: "Research", icon: BiotechIcon},
    {name: "Fleet", icon: RocketLaunchIcon},
    {name: "Exploration", icon: SatelliteAltIcon},
]


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

    console.log(auth.user?.profile.sub)

    return (
        <ThemeProvider theme={darkTheme}>

            <Box sx={{display: 'flex', minHeight: '100vh'}}>
                <CssBaseline/>
                <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            size="large"
                            sx={{mr: 2}}
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <MenuOpen/> : <MenuIcon/>}
                        </IconButton>
                        <Typography style={{flexGrow: 1}} variant="h6">VoidForge</Typography>
                        <Box>
                            <Button onClick={handleMenu} sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <Avatar/>
                                <Typography variant="button">
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
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar/>
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem disablePadding sx={{display: 'block'}} key={item.name}>
                                <ListItemButton selected={selectedIndex === index}
                                                onClick={() => setSelectedIndex(index)} sx={[{
                                    minHeight: 48,
                                    px: 2.5
                                }, open ? {justifyContent: 'initial'} : {justifyContent: 'center'}]}>
                                    <ListItemIcon
                                        sx={[{minWidth: 0, justifyContent: 'center'}, open ? {mr: 3} : {mr: 'auto'}]}>
                                        <item.icon/>
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} sx={[open ? {opacity: 1} : {opacity: 0}]}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>

                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    {selectedIndex === 0 && <PlanetsMenu playerSub={auth.user!.profile.sub}/>}
                    {selectedIndex === 1 && <ComingSoon/>}
                    {selectedIndex === 2 && <ComingSoon/>}
                    {selectedIndex === 3 && <ComingSoon/>}
                </Box>
            </Box>


        </ThemeProvider>
    )
}

export default App