import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import {
  RouterProvider
} from "react-router-dom";
import './App.css';
import { getAppRouter } from './app.router';
import { initializei18n } from './i18n';
import { basenameToCountry, getPaletteByCountry } from './util';
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    flat: true;
  }
}

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const path = window.location.pathname
  const basename = `/${path.split('/')[1]}`
  const selectedCountry = basenameToCountry(basename);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          button: {
            textTransform: "none",
          },
        },
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          ...getPaletteByCountry(selectedCountry)
        },
        components: {
          MuiPaper: {
            variants: [
              {
                props: { variant: "flat" },
                style: {
                  boxShadow: "none",
                },
              },
            ],
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: "50px",
              },
            },
          },
          MuiInputLabel: {
            defaultProps: { shrink: true },
          },
          MuiOutlinedInput: {
            defaultProps: {
              notched: true,
            },
          },
        },
      }),
    [prefersDarkMode, selectedCountry]
  );
  useEffect(() => {
    initializei18n(basename);
  }, [basename])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={getAppRouter(basename)} key={basename} />
    </ThemeProvider>
  );
}

export default App;
