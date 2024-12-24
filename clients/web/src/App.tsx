import React, {useState} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Switch} from '@mui/material';
import Login from "./login/Login";
import {Route, Routes} from "react-router-dom";

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div style={{padding: 20}}>
                <Switch
                    checked={isDarkMode}
                    onChange={() => setIsDarkMode(!isDarkMode)}
                    inputProps={{'aria-label': 'theme toggle'}}
                />
                <Routes>
                    <Route path="/home" element={<Login/>}/>
                    <Route path="*" element={<h1>404: Page Not Found</h1>}/>
                </Routes>
            </div>
        </ThemeProvider>
    );
};

export default App;

