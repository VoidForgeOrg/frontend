import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {AuthProvider} from "react-oidc-context";
import {dexConfig} from "./config.ts";
import {createTheme, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider {...dexConfig}>
            <ThemeProvider theme={darkTheme}>
                <App/>
            </ThemeProvider>
        </AuthProvider>
    </StrictMode>,
)
