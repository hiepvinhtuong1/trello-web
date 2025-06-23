import { createTheme } from '@mui/material/styles';
import { red, teal } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    cssVariables: true,
    trelloCustom: {
        appBarHeight: '48px',
        boardBarHeight: '58px',
    },
    palette: {
        mode: 'dark',
        primary: {
            main: teal[500],
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        text: {
        }
    },
});

export default theme;