import {AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {MenuOpen} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import useGeneralStore from "../stores/generalStore.ts";
import {useAuth} from "react-oidc-context";

const TopBar = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const auth = useAuth();
    const toggleMenu = useGeneralStore(state => state.toggleMenu);
    const open = useGeneralStore(state => state.isMenuOpen);

    return (
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    size="large"
                    sx={{mr: 2}}
                    onClick={() => toggleMenu()}
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
    )
}

export default TopBar
