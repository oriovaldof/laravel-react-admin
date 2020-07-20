import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import Router from './Router'

import 'antd/dist/antd.css'

import AppProvider from "./contexts/AppProvider"
import AuthProvider from "./contexts/AuthProvider"

function Index() {
    return (
        <BrowserRouter>
            <AuthProvider value={{
                authenticated: false,
                token: null,
            }}>
                <AppProvider>
                <Route component={Router}/>
                </AppProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

ReactDOM.render(<Index/>, document.getElementById('root'))
