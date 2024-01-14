import { object, string } from "yup";

export const getSgnInFormSchema = () => object().shape({
    username: string().required().label('Username'),
    password: string().required().label('Password')
})