import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { basenameToLocale } from "./util";
import EnglishTranslations from './locales/en.json';
import ArabicTranslations from './locales/ae.json';
import HindiTranslations from './locales/in.json';
import FrenchTranslations from './locales/fr.json';
const resources = {
    ae: ArabicTranslations,
    in: HindiTranslations,
    en: EnglishTranslations,
    fr: FrenchTranslations
};

export const initializei18n = (basename: string) => {
    return i18n
        .use(initReactI18next)
        .init({
            resources,
            lng: basenameToLocale(basename),
            interpolation: {
                escapeValue: false
            }
        });
}
