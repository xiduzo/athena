import React, { createContext, FC, ReactNode, useContext, useState, useEffect } from 'react'

import { ICredentials } from '@aws-amplify/core'
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { Auth } from 'aws-amplify'
import { IUser } from 'src/lib/interfaces'
import { useMutation } from '@apollo/react-hooks'
import { MERGE_USER } from '../services/userService'

interface IAuthContext {
  setCredentials: (credentials: ICredentials | null) => void
  setSession: (session: CognitoUserSession | null) => void
  userCredentials: ICredentials | null
  userSession: CognitoUserSession | null
}

const AuthContext = createContext<IAuthContext>({
  setCredentials: (_: ICredentials | null) => {},
  setSession: (_: CognitoUserSession | null) => {},
  userCredentials: null,
  userSession: null,
})

const useAuthHandler = () => {
  const [ userCredentials, setUserCredentials ] = useState<ICredentials | null>(null)
  const [ userSession, setUserSession ] = useState<CognitoUserSession | null>(null)

  const [ MergeUser ] = useMutation(MERGE_USER)

  const setCredentials = (credentials: ICredentials | null) => {
    setUserCredentials(credentials)
  }

  const setSession = (session: CognitoUserSession | null) => {
    setUserSession(session)
  }

  useEffect(
    () => {
      if (!userSession || !userCredentials) return
      const mergeUserToDatabase = async () => {
        // Lets upgrade our user in the database
        const userInfo = await Auth.currentUserInfo()
        const { attributes } = userInfo
        const user: Partial<IUser> = {
          ...userInfo,
          email: attributes['email'] || null,
          identityProviderReference: attributes['custom:ipReferenceNumber'] || null,
        }
        console.log(user)
        MergeUser({
          variables: {
            ...user,
          },
        })
      }

      mergeUserToDatabase()
    },
    [ userSession, userCredentials ]
  )

  return { userCredentials, setCredentials, userSession, setSession }
}

const { Provider } = AuthContext

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { userCredentials, setCredentials, userSession, setSession } = useAuthHandler()

  useEffect(
    () => {
      if (userSession) return
      Auth.currentSession().then(setSession).catch(console.log)
    },
    [ userSession, setSession ]
  )

  useEffect(
    () => {
      if (userCredentials) return
      Auth.currentCredentials().then(setCredentials).catch(console.log)
    },
    [ userCredentials, setCredentials ]
  )

  return <Provider value={{ userCredentials, setCredentials, userSession, setSession }}>{children}</Provider>
}

export const useAuth = () => useContext(AuthContext)
