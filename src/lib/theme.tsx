import { amber, grey } from '@material-ui/core/colors'
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import React, { createContext, FC, ReactNode, useContext, useState } from 'react'

interface IThemeContext {
  theme: ThemeOptions
  setTheme: (theme: ThemeOptions) => void
}

const localThemeStyle = localStorage.getItem('themeStyle') === 'dark' ? 'dark' : 'light'
const initialTheme: ThemeOptions = {
  palette: {
    primary: amber,
    secondary: grey,
    type: localThemeStyle,
  },
}

const ThemeContext = createContext<IThemeContext>({
  theme: initialTheme,
  setTheme: (_: ThemeOptions) => {},
})

const useThemeHandler = () => {
  const [theme, setNewTheme] = useState<ThemeOptions>(initialTheme)

  const setTheme = (newTheme: ThemeOptions) => {
    newTheme.palette && localStorage.setItem('themeStyle', newTheme.palette.type as string)
    setNewTheme(newTheme)
  }

  return { theme, setTheme }
}

const { Provider } = ThemeContext

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useThemeHandler()

  const generateTheme = (options: ThemeOptions): Theme => createMuiTheme(options)

  return (
    <Provider value={{ theme, setTheme }}>
      <MuiThemeProvider theme={generateTheme(theme)}>{children}</MuiThemeProvider>
    </Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
