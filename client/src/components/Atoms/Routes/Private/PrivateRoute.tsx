import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from 'src/common/providers/AuthProvider'
import { IRoute } from 'src/lib/interfaces'

export const PrivateRoute: React.FC<Partial<IRoute>> = ({ component: Component, ...rest }) => {
  const { userSession } = useAuth()

  return (
    <Route
      {...rest}
      render={(props) =>
        userSession ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/account/login', state: { referer: props.location } }} />
        )}
    />
  )
}
