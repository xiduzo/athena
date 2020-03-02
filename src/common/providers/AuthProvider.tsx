import React, { createContext, FC, ReactNode, useContext, useState, useEffect } from 'react'

import { ICredentials } from '@aws-amplify/core'
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { Auth } from 'aws-amplify'

interface IAuthContext {
  setCredentials: (credentials: ICredentials) => void
  setSession: (session: CognitoUserSession) => void
  userCredentials: ICredentials | null
  userSession: CognitoUserSession | null
}

const AuthContext = createContext<IAuthContext>({
  setCredentials: (_: ICredentials) => {},
  setSession: (_: CognitoUserSession) => {},
  userCredentials: null,
  userSession: null,
})

const useAuthHandler = () => {
  const [ userCredentials, setUserCredentials ] = useState<ICredentials | null>(null)
  const [ userSession, setUserSession ] = useState<CognitoUserSession | null>(null)

  const setCredentials = (credentials: ICredentials) => {
    setUserCredentials(credentials)
  }

  const setSession = (session: CognitoUserSession) => {
    setUserSession(session)
  }

  return { userCredentials, setCredentials, userSession, setSession }
}

const { Provider } = AuthContext

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { userCredentials, setCredentials, userSession, setSession } = useAuthHandler()

  useEffect(
    () => {
      if (userCredentials) return
      Auth.currentCredentials().then(setCredentials)
    },
    [ userCredentials, setCredentials ]
  )

  useEffect(
    () => {
      if (userSession) return
      Auth.currentSession().then(setSession).catch((error) => {
        console.log(error)
      })
    },
    [ userSession, setSession ]
  )

  return <Provider value={{ userCredentials, setCredentials, userSession, setSession }}>{children}</Provider>
}

export const useAuth = () => useContext(AuthContext)
