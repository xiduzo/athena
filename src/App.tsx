import React, { useState } from 'react'
import { MuiThemeProvider, CssBaseline, makeStyles, Theme, Container } from '@material-ui/core'
import theme from 'lib/theme'
import { AthenaAppBar } from 'components/AthenaAppBar'
import { AthenaMenuDrawer } from 'components/AthenaMenuDrawer'

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

const App: React.FC = () => {
  const classes = useStyles()

  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const toggleMenuDrawer = () => {
    console.log(menuOpen)
    setMenuOpen(!menuOpen)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AthenaAppBar menuOpen={menuOpen} toggleMenuDrawer={toggleMenuDrawer} />
        <AthenaMenuDrawer menuOpen={menuOpen} toggleMenuDrawer={toggleMenuDrawer} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container maxWidth='xl'>dataa</Container>
        </main>
      </div>
    </MuiThemeProvider>
  )
}

export default App
