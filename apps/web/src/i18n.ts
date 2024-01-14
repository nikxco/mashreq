import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { basenameToLocale } from "./util";

const resources = {
    ae: {
        translation: {
            signInPage: {
                title: 'تسجيل الدخول | المشرق نت المصرفية',
                form: {
                    title: 'تسجيل الدخول',
                    inputs: {
                        username: {
                            label: 'اسم المستخدم',
                            placeholder: 'أدخل اسم المستخدم الخاص بك'
                        },
                        password: {
                            label: 'كلمة المرور',
                            placeholder: 'كلمة المرور'
                        }
                    },
                    buttons: {
                        signIn: 'تسجيل الدخول',
                        signUp: 'إنشاء حساب'
                    },
                    termsLabel: 'بتسجيل الدخول، فإنك توافق على شروط الاستخدام وسياسة الخصوصية الخاصة بنا. إذا كنت بحاجة إلى مساعدة بشأن حسابك، يرجى الاتصال بنا على .'
                }
            }
        }
    },
    in: {
        translation: {
            signInPage: {
                title: 'साइन इन | मशरेक नेट बैंकिंग',
                form: {
                    title: 'साइन इन',
                    inputs: {
                        username: {
                            label: `उपयोगकर्ता नाम`,
                            placeholder: `अपना उपयोगकर्ता नाम दर्ज करें`
                        },
                        password: {
                            label: 'पासवर्ड',
                            placeholder: `पासवर्ड`
                        }
                    },
                    buttons: {
                        signIn: 'साइन इन',
                        signUp: 'खाता बनाएं'
                    },
                    termsLabel: `साइनइन करके, आप हमारी उपयोग की शर्तों और गोपनीयता नीति से सहमत होते हैं। यदि आपको अपने खाते के संबंध में सहायता चाहिए, तो कृपया हमसे संपर्क करें।`
                }
            }
        }
    },
    en: {
        translation: {
            signInPage: {
                title: 'Sign In | Mashreq Net Banking',
                form: {
                    title: 'Sign in',
                    inputs: {
                        username: {
                            label: 'Username',
                            placeholder: 'Enter your username'
                        },
                        password: {
                            label: 'Password',
                            placeholder: 'Password'
                        }
                    },
                    buttons: {
                        signIn: 'Sign in',
                        signUp: 'Create account?'
                    },
                    tooltips: {
                        hidePassword: 'Hide password',
                        showPassword: 'Show password'
                    },
                    termsLabel: 'By sign in, you agree to our Terms of Use, and  Privacy Policy. If you need help with your account, please contact us.'
                }
            },
            signUpPage: {
                title: 'Sign up | Mashreq Net Banking',
                form: {
                    title: 'Sign up',
                    inputs: {
                        username: {
                            label: 'Username',
                            placeholder: 'Enter your username'
                        },
                        password: {
                            label: 'Password',
                            placeholder: 'Password'
                        },
                        confirmPassword: {
                            label: 'Confirm Password',
                            placeholder: 'Confirm Password'
                        }
                    },
                    buttons: {
                        create: 'Create',
                        signIn: 'Sign in instead?'
                    },
                    tooltips: {
                        hidePassword: 'Hide password',
                        showPassword: 'Show password'
                    },
                    termsLabel: 'By sign up, you agree to our Terms of Use, and  Privacy Policy. If you need help with your account, please contact us.'
                }
            },
            usersPage: {
                pageTitle: "Users"
            }
        }
    },
    fr: {
        translation: {
            signInPage: {
                title: 'Se connecter | Machrek Net Banking',
                form: {
                    title: 'Se connecter',
                    inputs: {
                        username: {
                            label: `Nom d'utilisateur`,
                            placeholder: `Entrez votre nom d'utilisateur`
                        },
                        password: {
                            label: 'Mot de passe',
                            placeholder: 'Mot de passe'
                        }
                    },
                    buttons: {
                        signIn: 'Se connecter',
                        signUp: 'Créer un compte'
                    },
                    termsLabel: `En vous connectant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité. Si vous avez besoin d'aide avec votre compte, veuillez nous contacter à.`
                }
            }
        }
    }
};

export const initializei18n = (basename: string) => {
    return i18n
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources,
            lng: basenameToLocale(basename), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
            // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
            // if you're using a language detector, do not define the lng option

            interpolation: {
                escapeValue: false // react already safes from xss
            }
        });
}
