import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Layout from '@components/Layout'
import Home from '@views/Home'
import Profile from '@views/User/Profile'
import Users from '@views/User/List'
import NotFound from '@views/NotFound'

function PrivateRoutes () {
  return (
    <>
      <Route path='/login' render={() => <Redirect to='/' />} />
      <Layout>
        <Switch>
          <Route path='/users' component={Users} />
          <Route path='/profile' component={Profile} />
          <Route exact path='/' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </>
  )
}

export default PrivateRoutes
