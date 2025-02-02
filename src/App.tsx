import './App.css'
import {
    Box,
    createTheme, CssBaseline,
    ThemeProvider,
    Toolbar,
} from "@mui/material";
import PlanetsMenu from "./components/planets/PlanetsMenu.tsx";
import PublicIcon from '@mui/icons-material/Public';
import BiotechIcon from '@mui/icons-material/Biotech';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import {useAuth} from "react-oidc-context";
import * as React from "react";
import ComingSoon from "./components/welcome/ComingSoon.tsx";
import TopBar from "./components/TopBar.tsx";
import MenuBar from "./components/MenuBar.tsx";
import useGeneralStore from "./stores/generalStore.ts";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

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
    const selectedIndex = useGeneralStore(state => state.selectedMenuItemIndex);


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
                <TopBar/>
                <MenuBar menuItems={menuItems}/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    {selectedIndex === 0 && <PlanetsMenu/>}
                    {selectedIndex === 1 && <ComingSoon/>}
                    {selectedIndex === 2 && <ComingSoon/>}
                    {selectedIndex === 3 && <ComingSoon/>}
                </Box>
            </Box>


        </ThemeProvider>
    )
}

export default App