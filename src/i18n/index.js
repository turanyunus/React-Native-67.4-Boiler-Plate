import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import TR_LOCALE from './tr';
import EN_LOCALE from './en';

const resources = {
  tr: {
    translation: TR_LOCALE
  },
  en: {
    translation: EN_LOCALE
  }
};

// RNLocalize.getLocales()[0].languageCode
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: 'tr',
    fallbackLng: 'en',
    fallbacks: true,
    whitelist: ['tr', 'en'],
    resources: resources
  })
  .then((r) => () => {
    console.log('i18n result: ', r);
  })
  .catch((r) => () => {
    console.log('i18n error: ', r);
  });

export default i18n;
