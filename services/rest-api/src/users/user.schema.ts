import { lazy, object, ref, string } from "yup";
import { Country } from "../common/common.type";
import { getUsernameValidationByCountry } from "../common/common.schema";

export const getSignUpFormSchema = (country: Country) => object().shape({
    basename: string().required().label('Basename'),
    username: lazy(() => getUsernameValidationByCountry(country).required().label('Username')),
    password: string().required().min(8).label('Password'),
    confirmPassword: string().required().oneOf([ref('password')], 'Passwords must match').label('Confirm password')
})