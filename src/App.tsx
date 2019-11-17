import React, { Suspense } from 'react'
import { MuiThemeProvider, CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { useSelector } from 'react-redux'
import theme from './lib/theme'
import { AthenaAppBar } from './components/AthenaAppBar'
import { AthenaMenuDrawer } from './components/AthenaMenuDrawer'
import { AthenaRouter } from './components/AthenaRouter'
import { BrowserRouter as Router } from 'react-router-dom'
import { IRootReducer } from './lib/redux'
import { AuthProvider } from './lib/auth'

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
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <AuthProvider>
          <Router>
            <CssBaseline />
            <AthenaAppBar />
            <AthenaMenuDrawer />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {/* TODO: add breadcrumbs? */}
              <Suspense fallback={'loading'}>
                <AthenaRouter />
              </Suspense>
            </main>
          </Router>
        </AuthProvider>
      </div>
    </MuiThemeProvider>
  )
}

export default App
