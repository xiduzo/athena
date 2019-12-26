import React, { FC } from 'react'

import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from '../Routes/Private'
import { IRoute, routes } from './links'

export const Routes: FC = () => {
  const renderRoute = (route: IRoute) => (
    <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
  )

  const renderPrivateRoute = (route: IRoute) => (
    <PrivateRoute exact={route.exact} key={route.path} path={route.path} component={route.component} />
  )

  return (
    <Switch>{routes.map((route: IRoute) => (route.private ? renderPrivateRoute(route) : renderRoute(route)))}</Switch>
  )
}
