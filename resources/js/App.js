import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Router from './Router'

import 'antd/dist/antd.css'

import { FALLBACK_LANG } from '~/variables'
import AppProvider from './contexts/AppProvider'
import AuthProvider from './contexts/AuthProvider'

import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

import translationEN from '~/locales/en/translation.json'
import translationPtBR from '~/locales/pt-BR/translation.json'

i18next.init({
  interpolation: { escapeValue: false },
  lng: navigator.language || navigator.userLanguage || navigator.browserLanguage,
  load: 'currentOnly',
  fallbackLng: FALLBACK_LANG,
  resources: {
    en: translationEN,
    'pt-BR': translationPtBR
  }
})

function App () {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <AuthProvider>
          <AppProvider>
            <Route component={Router} />
          </AppProvider>
        </AuthProvider>
      </I18nextProvider>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
