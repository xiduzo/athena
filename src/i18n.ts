import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

const locales = [ 'nl', 'en' ]
export const supportedLanguages = locales

const getLanguage = (): string => localStorage.getItem('i18nextLng') || 'en'

i18n.use(LanguageDetector).use(backend).use(initReactI18next).init({
  backend: {
    /* translation file path */
    loadPath: '/assets/i18n/{{ns}}/{{lng}}.json',
  },
  cache: { enabled: true },
  debug: false, // TODO: set false in production
  defaultNS: 'translations',
  fallbackLng: 'nl',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  keySeparator: false,
  lng: getLanguage(), // choose any language from the list of translations
  /* can have multiple namespace, in case you want to divide a huge
       translation into smaller pieces and load them on demand */
  ns: [ 'translations' ],
  react: {
    wait: true,
  },
})

export default i18n
