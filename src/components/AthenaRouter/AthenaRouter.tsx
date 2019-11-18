import React, { FC } from 'react'

import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from '../Routes/Private'
import { IRoute, routes } from '../AthenaMenuDrawer/routes'

export const AthenaRouter: FC = () => {
  const renderRoute = (route: IRoute) => (
    <Route key={route.path} path={route.path} component={route.component}></Route>
  )

  const renderPrivateRoute = (route: IRoute) => (
    <PrivateRoute key={route.path} path={route.path} component={route.component}></PrivateRoute>
  )

  return (
    <Switch>
      {routes.map((route: IRoute) =>
        route.private ? renderPrivateRoute(route) : renderRoute(route)
      )}
    </Switch>
  )
}
