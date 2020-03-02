import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from 'src/common/providers/AuthProvider'

interface IPrivateRoute {
  component: any
  path: string
  exact: boolean
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ component: Component, ...rest }) => {
  const { userSession } = useAuth()

  console.log(userSession)

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
