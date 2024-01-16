import { PaletteColorOptions } from "@mui/material";
import { blue, green, indigo, orange } from "@mui/material/colors";
import { Country } from "./components/country-selector/country-selector.component";
import { FetchResponse } from "./common.type";
import { HttpHeader, HttpStatus } from "./http.contstant";

/**
 * It is a utility method that checks if a given 
 * value is a valid json or not.
 * @param value 
 * @returns {boolean}
 */
export const isJSON = (value: any) => {
    try {
        JSON.parse(value);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * A fetch() promise only rejects when a network error is encountered.
 * A fetch() promise does not reject on HTTP errors (404, etc.). 
 * In order to handle HTTP error codes this method is used.
 * 
 * @param response 
 * 
 * Should it fail on errors or return null without throwing error, default to "throw"
 * @param onError 
 * @returns 
 */
export const handleHttpErrors = (
    response: Response,
    onError?: "throw" | "returnNull"
): Response => {
    if (!response.ok) {
        if (onError === "throw") {
            const { status } = response;
            if (status === HttpStatus.BadRequest) {
                throw response;
            } else if (response.status === HttpStatus.NotFound) {
                throw {
                    code: HttpStatus.NotFound,
                };
            } else if (response.status === HttpStatus.Unauthorized) {
                throw {
                    code: HttpStatus.Unauthorized,
                };
            } else if (response.status === HttpStatus.Forbidden) {
                throw {
                    code: HttpStatus.Forbidden,
                };
            } else if (response.status === HttpStatus.Conflict) {
                throw {
                    code: HttpStatus.Conflict,
                };
            } else {
                throw {
                    code: HttpStatus.InternalServerError,
                };
            }
        } else {
            return new Response(null);
        }
    } else {
        return response;
    }
};

/**
 * A utility method to extract 'body' and 'headers' from the response.
 * @param fetchRef 
 * @param onError 
 * @returns {Promise<FetchResponse<T>>}
 */
export const fromFetch = async <T>(
    fetchRef: Promise<Response>,
    onError: "throw" | "returnNull" = "throw"
): Promise<FetchResponse<T>> => {
    return new Promise((resolve, reject) => {
        fetchRef
            .then((res) => handleHttpErrors(res, onError))
            .then((response) => {
                return response.text().then((body) => {
                    return {
                        body,
                        headers: response.headers,
                    };
                });
            })
            .then(({ body, headers }) => {
                const parsedBody = body ? JSON.parse(body) : null;
                return {
                    body: parsedBody,
                    headers,
                };
            })
            .then((response) => {
                resolve(response || null);
            })
            .catch((err: Response) => {
                if (err instanceof Response) {
                    err?.text().then((data) => {
                        if (isJSON(data)) {
                            reject(JSON.parse(data));
                        } else {
                            reject(err);
                        }
                    });
                } else {
                    reject(err);
                }
            });
    });
};

/**
 * List of supported countries can be configured here
 * @returns {Country[]}
 */
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

/**
 * It is used to get default https headers required to call the REST api.
 * Optionally it will add Authorization header also if the access token is provided.
 * @param token 
 * @returns {HeadersInit}
 */
export const getApiHeaders = (token?: string | null): HeadersInit => {
    let headers: HeadersInit = {
        [HttpHeader.X_API_KEY]: getApiKey(),
    };
    if (token) {
        headers[HttpHeader.AUTHORIZATION] = `Bearer ${token}`;
    }
    return headers;
};

/**
 * It is used to get associated basename with the given country.
 * @param country 
 * @returns {string}
 */
export const countryToBasename = (country: Country) => {
    return country.basename;
}

/**
 * It is used to conver basename to associated country.
 * If basename is '/' then it return the default country
 * @param basename 
 * @returns {Country}
 */
export const basenameToCountry = (basename: string) => {
    if (basename === '/') {
        return DefaultCountry;
    }
    return getSupportedContries().find((country) => country.basename === basename)!;
}

/**
 * It uses dynamically generated regex from the list of 
 * supported countries to extract basename.
 * @param path 
 * @returns {string}
 */
export const getBasenameFromPath = (path: string) => {
    const supportedBasenames = getSupportedContries()
        .map(({ basename }) => basename.substring(1, basename.length));
    const regex = new RegExp(`^\/(${supportedBasenames.join('|')})?\\b`, 'gi');
    let match = regex.exec(path);
    return (match && match[0]) || '/';
}

/**
 * It is used to fetch the locale value associated with a given basename/country
 * @param basename 
 * @returns {string}
 */
export const basenameToLocale = (basename: string) => {
    return basenameToCountry(basename)?.locale;
}

/**
 * It is used provide to country specific theming.
 * This can be extended even further to supported different 
 * component level theming as well.
 * @param country 
 * @returns {{ primary?: PaletteColorOptions, secondary?: PaletteColorOptions }}
 */
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

/**
 * Add ISO 3166-1 alpha 2 code for the default country
 * https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements
 * Note:
 * Country must be present in the supported country list
 */
export const DefaultCountryCode = 'US';
export const DefaultCountry: Country = getSupportedContries().find((country) => country.code === DefaultCountryCode)!

/**
 * It is used to get api host based on "production" or "development" environment.
 * '.env.production' and '.env.development' files contain environment 
 * variables used during the build/development.
 * @returns {string}
 */
export const getApiBaseUrl = () => {
    let baseUrl = process.env.REACT_APP_API_URI;
    if (!baseUrl) {
        throw Error('REACT_APP_API_URI is not available')
    }
    return baseUrl;

}

/**
 * Returns Api Key which is used for making REST api calls.
 * @returns {string}
 */
export const getApiKey = () => {
    let apiKey = process.env.REACT_APP_API_KEY;
    if (!apiKey) {
        throw Error('REACT_APP_API_KEY is not available')
    }
    return apiKey;

}