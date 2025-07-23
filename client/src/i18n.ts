import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import navbarEn from './locales/en/navbar.json';
import navbarUk from './locales/uk/navbar.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                navbar: navbarEn
            },
            uk: {
                navbar: navbarUk
            }
        },
        lng: localStorage.getItem('lang') || 'uk',
        fallbackLng: 'uk',
        ns: ['navbar'],
        defaultNS: 'navbar',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
