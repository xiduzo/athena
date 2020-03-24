import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from 'src/common/providers/AuthProvider'
import { IRoute } from 'src/lib/interfaces'
import { hasMatchesWith } from 'src/common/utils'
import { EmptyState, Illustration } from 'src/components'
import { IllustrationType } from 'src/lib/enums'

export const PrivateRoute: React.FC<IRoute> = ({ component: Component, ...route }) => {
  const { session } = useAuth()

  const userGroups: string[] = session ? session.getAccessToken().payload['cognito:groups'] : []
  const isAuthorized = hasMatchesWith<string>(route.userGroups, userGroups)

  if (session && !isAuthorized)
    return (
      <EmptyState
        title={'Not authorized'}
        subtitle={`You are not authorized to view this page`}
        image={<Illustration type={IllustrationType.NotAuthorized} />}
      />
    )

  return (
    <Route
      {...route}
      render={(props) =>
        session ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/account/login', state: { referer: props.location } }} />
        )}
    />
  )
}
