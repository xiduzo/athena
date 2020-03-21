import React, { createContext, FC, ReactNode, useContext, Suspense } from 'react'

import { ApolloProvider as ApolloProviderOriginal } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'
import { Auth } from 'aws-amplify'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

interface IApolloContext {}

const ApolloContext = createContext<IApolloContext>({})

const { Provider } = ApolloContext

export const ApolloProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
  })

  const authLink = setContext(async (_, { headers }) => {
    const user = await Auth.currentSession()
    const token = user.getAccessToken().getJwtToken()

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      resultCaching: true,
    }),
  })

  return (
    <Provider value={{}}>
      <Suspense fallback={`loading apollo`}>
        {client && <ApolloProviderOriginal client={client}>{children}</ApolloProviderOriginal>}
      </Suspense>
    </Provider>
  )
}

export const useAuth = () => useContext(ApolloContext)
