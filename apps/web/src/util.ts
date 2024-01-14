import { PaletteColorOptions } from "@mui/material";
import { blue, green, indigo, orange } from "@mui/material/colors";
import { Country } from "./components/country-selector/country-selector.component";
import { FetchResponse } from "./common.type";
import { HttpHeader, HttpStatus } from "./http.contstant";

export const isJSON = (value: any) => {
    try {
        JSON.parse(value);
        return true;
    } catch (error) {
        return false;
    }
};

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

export const getApiHeaders = (token?: string | null): HeadersInit => {
    let headers: any = {
        [HttpHeader.X_API_KEY]: 'tcgxjUQBuISPRrDuyMJ1xBaIrT6rmtD7',
    };
    if (token) {
        headers[HttpHeader.AUTHORIZATION] = `Bearer ${token}`;
    }
    return headers;
};

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