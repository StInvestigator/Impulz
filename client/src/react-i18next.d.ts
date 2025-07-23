import 'react-i18next';
import type navbar_en from './locales/en/navbar.json';

declare module 'react-i18next' {
    interface CustomTypeOptions {
        defaultNS: 'navbar';
        ns: ['navbar'];
        resources: {
            navbar: typeof navbar_en;
        };
    }
}
