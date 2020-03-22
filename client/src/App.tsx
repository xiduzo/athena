import React, { Suspense } from 'react'
import { CssBaseline, makeStyles, Theme, Hidden, Container } from '@material-ui/core'
import { AppBar } from './components/Molecules/AppBar'
import { MenuDrawer } from './components/Molecules/MenuDrawer'
import { Routes } from './components/Routes'
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider } from './common/providers/ThemeProvider'
import { AuthProvider } from './common/providers/AuthProvider'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfiguration } from './common/utils/snackbarWrapper'
import { ApolloProvider } from './common/providers/ApolloProvider'
import { ToolbarSpacer } from './components/Atoms/ToolbarSpacer'

const useStyles = makeStyles((theme: Theme) => {
  return {
    content: {
      flexGrow: 1,
    },
    root: {
      display: 'flex',
      padding: 0,
    },
  }
})

const App: React.FC = () => {
  const classes = useStyles()

  return (
    <ApolloProvider>
      <AuthProvider>
        <ThemeProvider>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{
              horizontal: 'left',
              vertical: 'bottom',
            }}
          >
            <SnackbarUtilsConfiguration />
            <CssBaseline />
            {/* TODO container in own component */}
            <Container maxWidth={false} className={classes.root}>
              <Suspense fallback={'loading'}>
                <Router>
                  <AppBar />
                  <MenuDrawer />
                  <main className={classes.content}>
                    {/* TODO: add breadcrumbs? */}
                    <ToolbarSpacer xsDown />
                    <Routes />
                    <ToolbarSpacer mdUp />
                  </main>
                </Router>
              </Suspense>
            </Container>
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
