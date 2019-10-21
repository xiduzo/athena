import React, { useState } from 'react'
import { MuiThemeProvider, CssBaseline, makeStyles, Theme, Container } from '@material-ui/core'
import { useSelector } from 'react-redux'
import theme from './lib/theme'
import { AthenaAppBar } from './components/AthenaAppBar'
import { AthenaMenuDrawer } from './components/AthenaMenuDrawer'
import { AthenaRouter } from './components/AthenaRouter'
import { IRootReducer } from './lib/redux'
import { BrowserRouter as Router } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) => {
  return {
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
    },
    toolbar: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
  }
})

// Make this it's own component so it wont re-render App on state change
const BaseComponents: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const toggleMenuDrawer = () => setMenuOpen(!menuOpen)

  return (
    <>
      <AthenaAppBar menuOpen={menuOpen} toggleMenuDrawer={toggleMenuDrawer} />
      <AthenaMenuDrawer menuOpen={menuOpen} toggleMenuDrawer={toggleMenuDrawer} />
    </>
  )
}

const App: React.FC = () => {
  const classes = useStyles()

  const user = useSelector((state: IRootReducer) => state.user)
  console.log(user)

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router>
          <CssBaseline />
          <BaseComponents />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container maxWidth='xl'>
              <AthenaRouter />
            </Container>
          </main>
        </Router>
      </div>
    </MuiThemeProvider>
  )
}

export default App
