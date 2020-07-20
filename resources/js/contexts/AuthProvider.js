import React, {
    useState, useEffect, createContext, useContext,
} from 'react'
import Cookies from 'js-cookie'

import {APP_COOKIES_PREFIX} from '../variables'

import * as auth from  '../services/AuthService'

const AuthContextData = {
    pageLoading: true,
    authenticated: null,
    user: {},
    login: async function() {}
}

const AuthContext = createContext(AuthContextData)

function AuthProvider({children}) {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [pageLoading, setPageLoading] = useState(true)

    useEffect(() => {
        (async () => {
            await loadCookies()
        })()
    }, [])

    const login = async (values) => {
        const response = await auth.login(values)

        if(response.data.status === 'success') {
            setToken(response.data.access_token)
            setUser(response.data.user)
            await saveCookies(response.data)
        }

        return response
    }

    const logout = async () => {
        const response = await auth.logout()

        if(response.data.status === 'success') {
            setToken(null)
            setUser(null)
            await Cookies.remove(APP_COOKIES_PREFIX + 'token')
            await Cookies.remove(APP_COOKIES_PREFIX + 'user')
            setAxiosToken(null)
        }

        return response
    }

    const saveCookies = async (data) => {
        if(data.access_token && data.user) {
            await Cookies.set(APP_COOKIES_PREFIX + 'token', data.access_token, {expires: 7})
            await saveUserCookies(data.user)
            setAxiosToken(data.access_token)
        }
    }

    const saveUserCookies = async userData => {
        return Cookies.set(APP_COOKIES_PREFIX + 'user', userData, {expires: 7})
    }

    const loadCookies = async () => {
        const storedToken = await Cookies.get(APP_COOKIES_PREFIX + 'token')
        const storedUser =  await Cookies.get(APP_COOKIES_PREFIX + 'user')
        if(storedToken && storedUser) {
            setUser(JSON.parse(storedUser))
            setToken(storedToken)
            setAxiosToken(storedToken)
        }
        setPageLoading(false)
    }

    const setAxiosToken = (access_token) => {
        window.axios.defaults.headers['Authorization'] = `Bearer ${access_token}`
    }

    const updateUser = async values => {
        let userData = {
            ...user,
            name: values.name
        }

        setUser(userData)
        return saveUserCookies(userData)
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, updateUser, pageLoading, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
