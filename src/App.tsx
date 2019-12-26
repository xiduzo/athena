import React from 'react'
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
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
  }
})

const App: React.FC = () => {
  const classes = useStyles()

  const global = useSelector((state: IRootReducer) => state.global)
  console.log(global)

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
              {/* <Suspense fallback={'loading'}> */}
              <Routes />
              {/* </Suspense> */}
            </main>
          </Router>
        </AthenaAuthProvider>
      </div>
    </AthenaThemeProvider>
  )
}

export default App
