import React, { Suspense } from 'react'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { AppBar } from './components/Molecules/AppBar'
import { MenuDrawer } from './components/Molecules/MenuDrawer'
import { Routes } from './components/Routes'
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider } from './common/providers/ThemeProvider'
import { AuthProvider } from './common/providers/AuthProvider'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfiguration } from './lib/utils/snackbarWrapper'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Auth } from 'aws-amplify'

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

const useStyles = makeStyles((theme: Theme) => {
  return {
    content: {
      flexGrow: 1,
    },
    root: {
      display: 'flex',
    },
    toolbar: {
      [theme.breakpoints.up('sm')]: {
        ...theme.mixins.toolbar,
        padding: theme.spacing(0, 1),
      },
    },
    toolbarBottom: {
      ...theme.mixins.toolbar,
      [theme.breakpoints.down('xs')]: {
        ...theme.mixins.toolbar,
        padding: theme.spacing(0, 1),
      },
    },
  }
})

const App: React.FC = () => {
  const classes = useStyles()

  return (
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        <SnackbarUtilsConfiguration />
        <div className={classes.root}>
          <AuthProvider>
            <ApolloProvider client={client}>
              <CssBaseline />
              <Suspense fallback={'loading'}>
                <Router>
                  <AppBar />
                  <MenuDrawer />
                  {/* TODO wrap main in own component */}
                  <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {/* TODO: add breadcrumbs? */}
                    <Routes />
                    <div className={classes.toolbarBottom} />
                  </main>
                </Router>
              </Suspense>
            </ApolloProvider>
          </AuthProvider>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
