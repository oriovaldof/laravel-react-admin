import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from '@views/Login'

function PublicRoutes () {
  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route render={() => <Redirect to='/login' />} />
    </Switch>
  )
}

export default PublicRoutes
