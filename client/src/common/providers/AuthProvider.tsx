import { useMutation } from '@apollo/react-hooks'
import { ICredentials } from '@aws-amplify/core'
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { Auth } from 'aws-amplify'
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { MERGE_USER } from 'src/common/services'
import { IUser } from 'src/lib/interfaces'
import { generateRandomAvatar } from 'src/components'

interface IAuthContext {
  setCredentials: (credentials: ICredentials | null) => void
  setSession: (session: CognitoUserSession | null) => void
  setUserInfo: any
  credentials: ICredentials | null
  session: CognitoUserSession | null
  userInfo: any
}

const AuthContext = createContext<IAuthContext>({
  setCredentials: (_: ICredentials | null) => {},
  setSession: (_: CognitoUserSession | null) => {},
  setUserInfo: null,
  credentials: null,
  session: null,
  userInfo: null,
})

const useAuthHandler = () => {
  const [credentials, setUserCredentials] = useState<ICredentials | null>(null)

  const [session, setUserSession] = useState<CognitoUserSession | null>(null)
  const [userInfo, setUserInfo] = useState<any>(null)

  const [MergeUser] = useMutation(MERGE_USER)

  const setCredentials = (credentials: ICredentials | null) => setUserCredentials(credentials)

  const setSession = (session: CognitoUserSession | null) => setUserSession(session)

  useEffect(() => {
    if (!session || !credentials) return
    const mergeUserToDatabase = async () => {
      // Lets upgrade our user in the database
      const userInfo = await Auth.currentUserInfo()
      setUserInfo(userInfo)

      const { attributes } = userInfo
      const user: Partial<IUser> = {
        ...userInfo,
        email: attributes['email'],
        identityProviderReference: attributes['custom:ipReferenceNumber'] || null, // TODO Need to add ipReferenceNumber to users when sign up
        displayName: attributes['custom:displayName'] || attributes['email'], // TODO Need to add displayName to users when sign up
        // TODO if users first time login, set random avatar
        // Probably want to do this at sign-up => show avatar creator
        // avatarStyle: JSON.stringify(generateRandomAvatar()),
      }
      if (false) {
        console.log(generateRandomAvatar())
      }

      await MergeUser({
        variables: {
          ...user,
        },
      })
    }

    mergeUserToDatabase()
  }, [session, credentials, MergeUser])

  return { credentials, setCredentials, session, setSession, userInfo, setUserInfo }
}

const { Provider } = AuthContext

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    credentials,
    setCredentials,
    session,
    setSession,
    userInfo,
    setUserInfo,
  } = useAuthHandler()

  useEffect(() => {
    if (session) return
    Auth.currentSession().then(setSession).catch(console.log)
  }, [session, setSession])

  useEffect(() => {
    if (credentials) return
    Auth.currentCredentials().then(setCredentials).catch(console.log)
  }, [credentials, setCredentials])

  return (
    <Provider value={{ credentials, setCredentials, session, setSession, userInfo, setUserInfo }}>
      {children}
    </Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
