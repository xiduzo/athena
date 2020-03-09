import React, { FC, useEffect } from 'react'
import { useAuth } from 'src/common/providers/AuthProvider'
import { useHistory } from 'react-router-dom'

export const HomeRoute: FC = () => {
  const { userCredentials, userSession } = useAuth()
  const history = useHistory()

  useEffect(
    () => {
      if (!userCredentials || !userSession) history.push('/account/login')
    },
    [ userCredentials, userSession, history ]
  )
  return <div>home</div>
}
