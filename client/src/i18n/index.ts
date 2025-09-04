import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'uk',
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        ns: ['navbar', "sidebar", "main", "footer"],
        defaultNS: 'main',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
