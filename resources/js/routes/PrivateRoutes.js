import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '@views/Home'
import Profile from '@views/User/Profile'
import Users from '@views/User/List'

function PrivateRoutes () {
  return (
    <Switch>
      <Route path='/login' exact render={() => <Redirect to='/' />} />
      <Route path='/users' component={Users} />
      <Route path='/profile' component={Profile} />
      <Route path='/' component={Home} />
    </Switch>
  )
}

export default PrivateRoutes
