import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'; // adding lazy loading for translations, more information here: https://github.com/i18next/i18next-http-backend

/**
 * Default localization settings. the locales are retrieved from the public URL. Namespaces are common and application specific
 *
 */
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    //supportedLngs: ["en", "de"],
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // locale files path
    },
    ns: ['satisfactory'],
    lng: 'en',
    defaultNS: 'common',
    fallbackLng: ['en'],
    supportedLngs: ['en', 'nl', 'es', 'de'],
  });
