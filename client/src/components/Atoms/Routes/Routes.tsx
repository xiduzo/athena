import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { IRoute } from 'src/lib/interfaces'
import { NotFound } from 'src/modules/generic/scenes/notFound'
import { PrivateRoute } from '../Routes/Private'
import { routes } from './links'

export const Routes: FC = () => {
  const renderRoute = (route: IRoute) => (
    <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
  )

  const renderPrivateRoute = (route: IRoute) => <PrivateRoute key={route.path} {...route} />

  return (
    <Switch>
      {routes.map((route: IRoute) => (route.private ? renderPrivateRoute(route) : renderRoute(route)))}
      <Route component={NotFound} />
    </Switch>
  )
}
