import { UserRole } from 'src/lib/enums'
import React, { FC, Fragment, ReactNode, useState, useEffect } from 'react'
import { useAuth } from 'src/common/providers'
import { hasMatchesWith } from 'src/common/utils'

interface IShow {
  forGroups?: UserRole[]
  forUsers?: string[]
  children: ReactNode
}
export const Show: FC<IShow> = ({ forGroups, forUsers, children }) => {
  const { session, userInfo } = useAuth()
  const [showElement, setShowElement] = useState(false)

  useEffect((): void => {
    if (!session) return
    if (!userInfo) return
    if (forGroups) {
      const userGroups: string[] = session.getAccessToken().payload['cognito:groups']
      const isAuthorized = hasMatchesWith<string>(forGroups, userGroups)
      setShowElement(isAuthorized)
    }

    if (forUsers) {
      const isAuthorized = forUsers.some((user) => user === userInfo.id)
      setShowElement(isAuthorized)
    }
  }, [session, forGroups, forUsers, userInfo])

  if (!showElement) return null
  return <Fragment>{children}</Fragment>
}
