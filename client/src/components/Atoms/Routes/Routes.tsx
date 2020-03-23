import React, { FC } from 'react'

import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from '../Routes/Private'
import { routes } from './links'
import { NotFound } from 'src/modules/generic/scenes/notFound'
import { Home } from 'src/modules/generic/scenes/home'
import { IRoute } from 'src/lib/interfaces'

export const Routes: FC = () => {
  const renderRoute = (route: IRoute) => (
    <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
  )

  const renderPrivateRoute = (route: IRoute) => <PrivateRoute key={route.path} {...route} />

  return (
    <Switch>
      <PrivateRoute exact={true} path={'/'} component={Home} />
      {routes.map((route: IRoute) => (route.private ? renderPrivateRoute(route) : renderRoute(route)))}
      <Route component={NotFound} />
    </Switch>
  )
}
