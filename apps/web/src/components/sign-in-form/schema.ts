import { lazy, object, string } from "yup";

const UAEUsernameSchema = string().min(5).matches(/^[a-zA-Z0-9]+$/, {
    message: `Username must be alphanumeric`
});
const USUsernameSchema = string().min(8).matches(/^[a-zA-Z]+$/, {
    message: `Username must contain only alphabets`
});
const IndianUsernameSchema = string().min(6).matches(/^\d.*/, {
    message: `Username must start with a number`
});
const FrenchUsernameSchema = string().min(5).lowercase().not(['admin']);
const getUsernameValidationByBasename = (basename: string) => {
    if (basename === '/in') {
        return IndianUsernameSchema;
    } else if (basename === '/ae') {
        return UAEUsernameSchema
    } else if (basename === '/us') {
        return USUsernameSchema
    } else if (basename === '/fr') {
        return FrenchUsernameSchema
    } else {
        throw Error(`Unsupported base: ${basename}`);
    }
}

export const getSgninFormSchema = (basename: string) => object().shape({
    username: lazy(() => getUsernameValidationByBasename(basename).required().label('Username')),
    password: string().required().min(8).label('Password')
})