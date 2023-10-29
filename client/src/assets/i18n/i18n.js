import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AUTH_EN from './locales/en/auth.json';
import AUTH_VI from './locales/vi/auth.json';
import LNG_VI from './locales/vi/lng.json';
import LNG_EN from './locales/en/lng.json';

// Layout 
import LAYOUT_EN from './locales/en/layout.json';
import LAYOUT_VI from './locales/vi/layout.json';

// Common
import COMMON_EN from './locales/en/common.json';
import COMMON_VI from './locales/vi/common.json';

// Introduct
import INTRODUCE_EN from './locales/en/introduce.json';
import INTRODUCE_VI from './locales/vi/introduce.json';

// Information
import INFORMATION_EN from './locales/en/information.json';
import INFORMATION_VI from './locales/vi/information.json';

// Button
import BTN_EN from './locales/en/btn.json';
import BTN_VI from './locales/vi/btn.json';

// Recruit
import RECRUIT_EN from './locales/en/recruit.json';
import RECRUIT_VI from './locales/vi/recruit.json';

// Validate
import VALIDATE_EN from './locales/en/validate.json';
import VALIDATE_VI from './locales/vi/validate.json';

export const locales = {
    en: 'English',
    vi: 'Tiếng Việt'
}

const resources = {
    en: {
        auth: AUTH_EN,
        lng: LNG_EN,
        layout: LAYOUT_EN,
        common: COMMON_EN,
        introduce: INTRODUCE_EN,
        information: INFORMATION_EN,
        btn: BTN_EN,
        recruit: RECRUIT_EN,
        validate: VALIDATE_EN
    },
    vi: {
        auth: AUTH_VI,
        lng: LNG_VI,
        layout: LAYOUT_VI,
        common: COMMON_VI,
        introduce: INTRODUCE_VI,
        information: INFORMATION_VI,
        btn: BTN_VI,
        recruit: RECRUIT_VI,
        validate: VALIDATE_VI

    }
};

const defaultNs = 'lng';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "vi", 
        fallbackLng: 'vi',
        ns: ['auth', 'lng', 'layout', 'common', 'introduce', 'information', 'btn', 'recruit', 'validate'],
        defaultNs,
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;