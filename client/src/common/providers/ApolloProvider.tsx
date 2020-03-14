import React, { createContext, FC, ReactNode, useContext, Suspense } from 'react'

import { ApolloProvider as ApolloProviderOriginal } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'
import { Auth } from 'aws-amplify'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

interface IApolloContext {}

const ApolloContext = createContext<IApolloContext>({})

const useAuthHandler = () => {
  //   const [ userCredentials, setUserCredentials ] = useState<ICredentials | null>(null)
  //   const [ userSession, setUserSession ] = useState<CognitoUserSession | null>(null)
  //   const setCredentials = (credentials: ICredentials | null) => {
  //     setUserCredentials(credentials)
  //   }
  //   const setSession = (session: CognitoUserSession | null) => {
  //     setUserSession(session)
  //   }
  //   return { userCredentials, setCredentials, userSession, setSession }
}

const { Provider } = ApolloContext

export const ApolloProvider: FC<{ children: ReactNode }> = ({ children }) => {
  //   const { userCredentials, setCredentials, userSession, setSession } = useAuthHandler()

  const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
  })

  const authLink = setContext(async (_, { headers }) => {
    const user = await Auth.currentSession()
    const token = user.getAccessToken().getJwtToken()
    console.log(token)
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })
  console.log(authLink, authLink.concat(httpLink))

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      resultCaching: true,
    }),
  })
  console.log(authLink, client)

  return (
    <Provider value={{}}>
      <Suspense fallback={`loading apollo`}>
        {client && <ApolloProviderOriginal client={client}>{children}</ApolloProviderOriginal>}
      </Suspense>
    </Provider>
  )
}

export const useAuth = () => useContext(ApolloContext)
