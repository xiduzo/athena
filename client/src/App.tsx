import { CssBaseline } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider, AuthProvider, ThemeProvider } from 'src/common/providers'
import { SnackbarUtilsConfiguration } from 'src/common/utils'
import { Stage } from './components'

const App: React.FC = () => {
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
            <Router>
              <Stage />
            </Router>
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
