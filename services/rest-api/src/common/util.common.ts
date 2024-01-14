import { Request } from "express";
import { HttpHeader } from "./constant.common";
import { Country, ValidationError } from "./type.common";
import { SignOptions, sign } from "jsonwebtoken";
import { User } from "../auth/auth.type";

export const getBearerToken = (req: Request): string | null => {
    let token = req.get(HttpHeader.AUTHORIZATION) || "";
    token = token && token.split(" ")[1];
    return token || null;
};

export const validateEnvVariables = (env: NodeJS.ProcessEnv) => {
    const { APP_SECRET, API_KEY, ALLOWED_ORIGIN, SERVER_PORT, BASE_PATH } = env;
    let missingVariables = [];
    if (!APP_SECRET) {
        missingVariables.push('APP_SECRET');
    }
    if (!API_KEY) {
        missingVariables.push('API_KEY');
    }
    if (!ALLOWED_ORIGIN) {
        missingVariables.push('ALLOWED_ORIGIN');
    }
    if (!SERVER_PORT) {
        missingVariables.push('SERVER_PORT');
    }
    if (!BASE_PATH) {
        missingVariables.push('BASE_PATH');
    }
    if (missingVariables.length > 0) {
        console.error(`Environment variables: [${missingVariables.join(', ')}] are missing.`);
        process.exit(1);
    } else {
        console.info('Environment variables initialized.');
    }

}

export const executeOnce = (callback: Function) => {
    var called = false;
    var cache: any;
    return (...args: any) => {
        if (!called) {
            cache = callback(...args);
            called = true;
        }
        return cache;
    };
}

export const toValidationErrorsFromYup = (error: { inner: any[] }): ValidationError[] => {
    const { inner = [] } = error;
    return inner.map(({ path, message }) => {
        return { field: path, message }
    })
}

export const getJwt = async (
    user: User,
    options: SignOptions
): Promise<string> => {
    const appSecretKey = process.env.APP_SECRET!;
    return new Promise((resolve, reject) => {
        sign(
            {
                data: user,
            },
            appSecretKey,
            options,
            (error: any, token: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token);
                }
            }
        );
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

export const defaultCountryCode = 'US';
export const DefaultCountry: Country = getSupportedContries().find((country) => country.code === defaultCountryCode)!