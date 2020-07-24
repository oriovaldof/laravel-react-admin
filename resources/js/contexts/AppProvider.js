import React, {
  useState, useEffect, createContext, useContext
} from 'react'

import { APP_COOKIES_PREFIX } from '@variables'
import Loading from '@components/Loading/Loading'

const AppContextData = {
  loading: false,
  collapsed: {}
}

const AppContext = createContext(AppContextData)

function AppProvider ({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const collapsed = JSON.parse(localStorage.getItem(APP_COOKIES_PREFIX + 'collapsed') || 'false')
    setCollapsed(collapsed)
  }, [])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
    localStorage.setItem(APP_COOKIES_PREFIX + 'collapsed', !collapsed)
  }

  const value = {
    collapsed: { get: collapsed, toggle: toggleCollapsed },
    loading: setLoading
  }

  return (
    <AppContext.Provider value={{ ...value }}>
      {loading ? <Loading /> : null}
      {children}
    </AppContext.Provider>
  )
}

export const appContext = () => useContext(AppContext)

export default AppProvider
