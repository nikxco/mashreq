import { PaletteColorOptions } from "@mui/material";
import { blue, green, indigo, orange } from "@mui/material/colors";
import { Country } from "./components/country-selector/country-selector.component";

export const getSupportedContries = (): Country[] => {
    return [
        {
            code: 'AE',
            locale: 'ae',
            basename: '/ae',
            name: 'United Arab Emirates'
        },
        {
            code: 'IN',
            locale: 'in',
            basename: '/in',
            name: 'India'
        },
        {
            code: 'FR',
            locale: 'fr',
            basename: '/fr',
            name: 'France'
        },
        {
            code: 'US',
            locale: 'en',
            basename: '/us',
            name: 'United States of America'
        }
    ]
}

export const countryToBasename = (country: Country) => {
    return country.basename;
}
export const basenameToCountry = (basename: string) => {
    if (basename === '/') {
        return DefaultCountry;
    }
    return getSupportedContries().find((country) => country.basename === basename)!;
}
export const basenameToLocale = (basename: string) => {
    return basenameToCountry(basename)?.locale;
}
export const getPaletteByCountry = (country: Country): { primary?: PaletteColorOptions, secondary?: PaletteColorOptions } => {
    let primary: PaletteColorOptions | undefined;
    const { code, name } = country;
    if (code === 'IN') {
        primary = {
            main: orange[500],
            dark: orange[700],
            light: orange[200]
        }
    } else if (code === 'AE') {
        primary = {
            main: green[700],
            dark: green[900],
            light: green[500]
        }
    } else if (code === 'US') {
        primary = {
            main: indigo[500],
            dark: indigo[700],
            light: indigo[200]
        }
    } else if (code === 'FR') {
        primary = {
            main: blue[800],
            dark: blue[700],
            light: blue[200]
        }
    } else {
        throw Error(`No theme supported for country: ${name}`)
    }
    return { primary }
}
export const defaultCountryCode = 'US';
export const DefaultCountry: Country = getSupportedContries().find((country) => country.code === defaultCountryCode)!