import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from 'src/lib/auth'

interface IPrivateRoute {
  component: any
  path: string
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ component: Component, ...rest }) => {
  // export function PrivateRoute<IPrivateRoute>({ Component, ...rest }) {
  const { authTokens } = useAuth()

  return (
    <Route
      {...rest}
      render={props =>
        authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />
        )
      }
    />
  )
}
