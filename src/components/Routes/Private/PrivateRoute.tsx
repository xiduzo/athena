import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from 'src/lib/auth'

interface IPrivateRoute {
  component: any
  path: string
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ component: Component, ...rest }) => {
  const { token } = useAuth()

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />
        )
      }
    />
  )
}
