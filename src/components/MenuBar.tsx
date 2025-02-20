import {
    CSSObject,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, styled,
    Theme,
    Toolbar
} from "@mui/material";
import * as React from "react";
import useGeneralStore from "../stores/generalStore.ts";
import MuiDrawer from "@mui/material/Drawer";

interface MenuBarProps {
    menuItems: MenuItem[];
}

interface MenuItem {
    name: string;
    icon: React.ElementType;
}

const DRAWER_WIDTH = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: DRAWER_WIDTH,
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
        width: DRAWER_WIDTH,
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

const MenuBar = ({menuItems}: MenuBarProps) => {

    const open = useGeneralStore(state => state.isMenuOpen);
    const selectedIndex = useGeneralStore(state => state.selectedMenuItemIndex);
    const onSelected = useGeneralStore(state => state.setSelectedMenuItemIndex);


    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar/>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem disablePadding sx={{display: 'block'}} key={item.name}>
                        <ListItemButton selected={selectedIndex === index}
                                        onClick={() => onSelected(index)} sx={[{
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
    )
}

export default MenuBar;
