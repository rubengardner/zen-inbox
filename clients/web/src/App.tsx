import React, {useState} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Button, Switch} from '@mui/material';
import Login from "./login/Login";

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
                <Button variant="contained" color="primary">
                    Toggle Theme
                </Button>
                <Login/>
            </div>
        </ThemeProvider>
    );
};

export default App;

