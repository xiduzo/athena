import React, { Suspense } from 'react'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { AppBar } from './components/Molecules/AppBar'
import { MenuDrawer } from './components/Molecules/MenuDrawer'
import { Routes } from './components/Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { IRootReducer } from './lib/redux'

import './i18n'
import { ThemeProvider } from './common/providers/ThemeProvider'
import { AuthProvider } from './common/providers/AuthProvider'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfiguration } from './lib/utils/snackbarWrapper'

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

  const global = useSelector((state: IRootReducer) => state.global)
  console.log(global)

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
            <CssBaseline />
            <Router>
              <AppBar />
              <MenuDrawer />
              <main className={classes.content}>
                <div className={classes.toolbar} />
                {/* TODO: add breadcrumbs? */}
                <Suspense fallback={'loading'}>
                  <Routes />
                </Suspense>
                <div className={classes.toolbarBottom} />
              </main>
            </Router>
          </AuthProvider>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
