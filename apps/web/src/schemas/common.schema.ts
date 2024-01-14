import { string } from "yup";
import { Country } from "../components/country-selector/country-selector.component";

const UAEUsernameSchema = string().required().min(5).matches(/^[a-zA-Z0-9]+$/, {
    message: `Username must be alphanumeric`
});
const USUsernameSchema = string().required().min(8).matches(/^[a-zA-Z]+$/, {
    message: `Username must contain only alphabets`
});
const IndianUsernameSchema = string().required().min(6).matches(/^\d.*/, {
    message: `Username must start with a number`
});
const FrenchUsernameSchema = string().required().min(5).lowercase().not(['admin']);

export const getUsernameValidationByCountry = (country: Country) => {
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