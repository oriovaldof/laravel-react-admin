import React, { useEffect } from 'react';

import PublicRoutes from "./routes/PublicRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"

import PageLoading from './components/Loading/PageLoading'

import {useAuth} from './contexts/AuthProvider'

function Router() {

    const {authenticated, pageLoading} = useAuth()

    if(pageLoading) {
        return <PageLoading />
    }

    return authenticated === false ? <PublicRoutes/> : <PrivateRoutes/>
}

export default Router
