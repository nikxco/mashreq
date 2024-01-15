import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from '@mui/material';
import { useMemo } from 'react';
import { CookiesProvider } from 'react-cookie';
import {
  RouterProvider
} from "react-router-dom";
import { getAppRouter } from './app.router';
import { initializei18n } from './i18n';
import { DefaultCountry, basenameToCountry, getBasenameFromPath, getPaletteByCountry } from './util';
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    flat: true;
  }
}

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const path = window.location.pathname
  const basename = getBasenameFromPath(path);
  if (basename === DefaultCountry.basename) {
    const newPath = `${window.location.origin}${path.substring(basename.length, path.length)}`;
    window.location.replace(newPath)
  }
  initializei18n(basename);
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <RouterProvider router={getAppRouter(basename)} key={basename} />
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
