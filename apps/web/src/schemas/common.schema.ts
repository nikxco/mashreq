import { Schema, string } from "yup";
import { Country } from "../components/country-selector/country-selector.component";

/**
 * Validation rule schema for 'United Arab Emirates'
 * Expectation: Username must be alphanumeric.
 */
const UAEUsernameSchema = string().required().min(5).matches(/^[a-zA-Z0-9]+$/, {
    message: `Username must be alphanumeric`
});

/**
 * Validation rule schema for 'United States of America'
 * Expectation: Username must contain only alphabets.
 */
const USUsernameSchema = string().required().min(8).matches(/^[a-zA-Z]+$/, {
    message: `Username must contain only alphabets`
});

/**
 * Validation rule schema for 'India'
 * Expectation: Username must start with a letter.
 */
const IndianUsernameSchema = string().required().min(6).matches(/^[a-zA-Z].*/, {
    message: `Username must start with a letter`
});

/**
 * Validation rule schema for 'France'
 * Expectation: Username must not be "admin (case insensitive)"
 */
const FrenchUsernameSchema = string().required().min(5).lowercase().not(['admin']);

/**
 * It returns schema based on a given country.
 * @param country 
 * @returns {Schema}
 */
export const getUsernameValidationByCountry = (country: Country): Schema => {
    const { code, name } = country
    if (code === 'IN') {
        return IndianUsernameSchema;
    } else if (code === 'AE') {
        return UAEUsernameSchema
    } else if (code === 'US') {
        return USUsernameSchema
    } else if (code === 'FR') {
        return FrenchUsernameSchema
    } else {
        throw Error(`Unsupported schema for country: ${name}`);
    }
}