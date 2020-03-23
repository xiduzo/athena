import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from 'src/common/providers/AuthProvider'
import { IRoute } from 'src/lib/interfaces'
import { hasMatchesWith } from 'src/common/utils'
import { EmptyState, Illustration } from 'src/components'
import { IllustrationType } from 'src/lib/enums'

export const PrivateRoute: React.FC<IRoute> = ({ component: Component, ...route }) => {
  const { userSession } = useAuth()

  if (!userSession) return null

  const userGroups: string[] = userSession.getAccessToken().payload['cognito:groups']
  const isAuthorized = hasMatchesWith<string>(route.userGroups, userGroups)

  if (!isAuthorized)
    return (
      <EmptyState
        title={'Not authorized'}
        subtitle={`You are not allowed to view this page`}
        image={<Illustration type={IllustrationType.NotAuthorized} />}
      />
    )

  return (
    <Route
      {...route}
      render={(props) =>
        userSession ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/account/login', state: { referer: props.location } }} />
        )}
    />
  )
}
