import { lazy, object, string, ref } from "yup";
import { getUsernameValidationByCountry } from "../../schemas/common.schema";
import { Country } from "../country-selector/country-selector.component";

export const getSignUpFormSchema = (country: Country) => object().shape({
    basename: string().required().label('Basename'),
    username: lazy(() => getUsernameValidationByCountry(country).required().label('Username')),
    password: string().required().min(8).label('Password'),
    confirmPassword: string().required().oneOf([ref('password')], 'Passwords must match').label('Confirm password')
})