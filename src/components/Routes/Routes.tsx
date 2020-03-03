import React, { FC } from 'react'

import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from '../Routes/Private'
import { IRoute, routes } from './links'
import { NotFoundRoute } from 'src/modules/generic/scenes/404'
import { HomeRoute } from 'src/modules/generic/scenes/Home'

export const Routes: FC = () => {
  const renderRoute = (route: IRoute) => (
    <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
  )

  const renderPrivateRoute = (route: IRoute) => (
    <PrivateRoute exact={route.exact} key={route.path} path={route.path} component={route.component} />
  )

  return (
    <Switch>
      <Route exact={true} path={'/'} component={HomeRoute} />
      {routes.map((route: IRoute) => (route.private ? renderPrivateRoute(route) : renderRoute(route)))}
      <Route path={'/'} component={NotFoundRoute} />
    </Switch>
  )
}
