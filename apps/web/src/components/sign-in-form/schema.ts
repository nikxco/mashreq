import { lazy, object, string } from "yup";
import { Country } from "../country-selector/country-selector.component";
import { getUsernameValidationByCountry } from "../../schemas/common.schema";

export const getSgnInFormSchema = (country: Country) => object().shape({
    username: lazy(() => getUsernameValidationByCountry(country).required().label('Username')),
    password: string().required().min(8).label('Password')
})