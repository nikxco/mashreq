import { useEffect } from "react";
import SignInFormComponent from "../../components/sign-in-form/sign-in-form.component";
import { useTranslation } from "react-i18next";

const SignInPage = () => {
    const { t: translate } = useTranslation();
    useEffect(() => {
        document.title = translate('signInPage.title');
    }, [])
    return (
        <SignInFormComponent />
    )
}

export default SignInPage