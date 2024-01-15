import { useEffect } from "react";
import SignUpFormComponent from "../../components/sign-up-form/sign-up-form.component"
import { useTranslation } from "react-i18next";

const SignUpPage = () => {
    const { t: translate } = useTranslation();
    useEffect(() => {
        document.title = translate('signUpPage.title');
    }, [])
    return (
        <SignUpFormComponent />
    )
}

export default SignUpPage