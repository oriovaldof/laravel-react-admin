import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from "~/views/Login/Login"

function PublicRoutes() {
    return (
        <Switch>
            {/*<Route path='/register' component={Register}/>*/}
            <Route path={'/Login'} exact component={Login}/>
            <Route render={() => <Redirect to={"/login"}/> }/>
            {/*<Route component={NotFound}/>*/}
        </Switch>
    )
}

export default PublicRoutes
