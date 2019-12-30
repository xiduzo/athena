import React, { Suspense } from 'react'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { AppBar } from './components/Molecules/AppBar'
import { MenuDrawer } from './components/Molecules/MenuDrawer'
import { Routes } from './components/Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { IRootReducer } from './lib/redux'
import { AthenaAuthProvider } from './lib/auth'
import { AthenaThemeProvider } from './lib/theme'

import './i18n'

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

  return (
    <AthenaThemeProvider>
      <div className={classes.root}>
        <AthenaAuthProvider>
          <Router>
            <CssBaseline />
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
        </AthenaAuthProvider>
      </div>
    </AthenaThemeProvider>
  )
}

export default App
