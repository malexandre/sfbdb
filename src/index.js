import React from 'react';
import ReactDOM from 'react-dom';
import i18n from "i18next";
import i18nLanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from "react-i18next";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import English from './locales/en.json'
import French from './locales/fr.json'

const languageDetector = new i18nLanguageDetector();
languageDetector.addDetector({
  name: 'defaultToEnglish',
  cacheUserLanguage() {},

  lookup() {
    return 'en';
  }
});

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    resources: {
      en: {
        translation: {
          skill: 'Skill',
          attack: 'Attack',
          reaction: 'Reaction',
          ...English
        }
      },
      fr: {
        translation: {
          skill: 'Compétence',
          attack: 'Attaque',
          reaction: 'Réaction',
          ...French
        }
      },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "fr"],

    interpolation: {
      escapeValue: false
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'defaultToEnglish'],

      lookupLocalStorage: 'i18nextLng',

      caches: ['localStorage'],
      excludeCacheFor: ['cimode'],

      htmlTag: document.documentElement
    }
  });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
