import './App.css'
import {
    AppBar,
    Avatar,
    Box, Card, CardContent,
    createTheme,
    IconButton, List,
    ListItem, ListItemButton, ListItemText,
    Stack,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

import { useTheme, useMediaQuery } from '@mui/material';

function App() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppBar position="static">
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar />
                            <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                Unknown
                            </Typography>
                        </Stack>
                    </Toolbar>
                </AppBar>

                <Box sx={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 4,
                    p: 2
                }}>
                    <List sx={{
                        width: { xs: '100%', md: 240 },
                        display: { xs: isMobile ? 'none' : 'block', md: 'block' }
                    }}>
                        {['Sectors', 'Exploration', 'Colonization', 'Trade'].map((text) => (
                            <ListItem disablePadding key={text}>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Card sx={{
                        flexGrow: 1,
                        minWidth: 300,
                        maxWidth: 1200,
                        mx: 'auto'
                    }}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                                Welcome to the VoidForge
                            </Typography>
                            <Typography variant="body1">
                                This will be the main screen you interact with
                            </Typography>
                        </CardContent>
                    </Card>

                    <List sx={{
                        width: { xs: '100%', md: 240 },
                        display: { xs: isMobile ? 'none' : 'block', md: 'block' }
                    }}>
                        {['Research', 'Fleet', 'Empire', 'Settings'].map((text) => (
                            <ListItem disablePadding key={text}>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </ThemeProvider>
    )
}


export default App
