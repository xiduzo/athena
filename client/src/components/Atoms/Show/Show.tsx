import { UserRole } from 'src/lib/enums'
import React, { FC, Fragment, ReactNode, useState, useEffect } from 'react'
import { useAuth } from 'src/common/providers'
import { hasMatchesWith } from 'src/common/utils'

interface IShow {
  forGroups?: UserRole[]
  forUser?: string
  children: ReactNode
}
export const Show: FC<IShow> = ({ forGroups, forUser, children }) => {
  const { userSession } = useAuth()
  const [ showElement, setShowElement ] = useState(false)

  useEffect(
    () => {
      if (!userSession) return
      if (forGroups) {
        const userGroups: string[] = userSession.getAccessToken().payload['cognito:groups']
        const isAuthorized = hasMatchesWith<string>(forGroups, userGroups)
        setShowElement(isAuthorized)
      }

      if (forUser) {
      }
    },
    [ userSession, forGroups, forUser ]
  )

  if (!showElement) return null
  return <Fragment>{children}</Fragment>
}
