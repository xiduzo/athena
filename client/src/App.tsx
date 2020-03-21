import React, { Suspense } from 'react'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { AppBar } from './components/Molecules/AppBar'
import { MenuDrawer } from './components/Molecules/MenuDrawer'
import { Routes } from './components/Routes'
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider } from './common/providers/ThemeProvider'
import { AuthProvider } from './common/providers/AuthProvider'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfiguration } from './common/utils/snackbarWrapper'
import { ApolloProvider } from './common/providers/ApolloProvider'
import { TopType } from './components/Atoms/Avataaar/enums/TopType'

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
  console.log(TopType['NoHair'])

  return (
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
        <div className={classes.root}>
          <ApolloProvider>
            <AuthProvider>
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
            </AuthProvider>
          </ApolloProvider>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
