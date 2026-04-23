import { alpha, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#bb1e2d',
      dark: '#8f1722',
      light: '#db5d68',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0d2a63',
      dark: '#091d45',
      light: '#4a69a5',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fff8f1',
      paper: '#ffffff',
    },
    text: {
      primary: '#152241',
      secondary: '#445272',
    },
    divider: alpha('#0d2a63', 0.08),
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily: '"Manrope", sans-serif',
    h1: {
      fontFamily: '"Fraunces", serif',
      fontWeight: 700,
      letterSpacing: '-0.05em',
      lineHeight: 0.94,
    },
    h2: {
      fontFamily: '"Fraunces", serif',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1,
    },
    overline: {
      fontWeight: 800,
      letterSpacing: '0.12em',
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          colorScheme: 'light',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 999,
        },
      },
    },
  },
})

export default theme
