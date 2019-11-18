import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import { createMuiTheme, Theme, ThemeProvider } from '@material-ui/core/styles'

import React, { FC, useState, createContext, useContext, ReactNode } from 'react'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'

interface IThemeContext {
  theme: ThemeOptions
  setTheme: (theme: ThemeOptions) => void
}

const localThemeStyle = localStorage.getItem('themeStyle') === 'dark' ? 'dark' : 'light'
const initial_theme_options: ThemeOptions = {
  palette: {
    primary: amber,
    secondary: green,
    type: localThemeStyle,
  },
}

const AthenaThemeContext = createContext<IThemeContext>({
  theme: initial_theme_options,
  setTheme: (_: ThemeOptions) => {},
})

const useThemeHandler = () => {
  const [theme, setNewTheme] = useState<ThemeOptions>(initial_theme_options)

  const setTheme = (newTheme: ThemeOptions) => {
    newTheme.palette && localStorage.setItem('themeStyle', newTheme.palette.type as string)
    setNewTheme(newTheme)
  }

  return { theme, setTheme }
}

const { Provider } = AthenaThemeContext

export const AthenaThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useThemeHandler()

  const generateTheme = (options: ThemeOptions): Theme => createMuiTheme(options)

  return (
    <Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={generateTheme(theme)}>{children}</ThemeProvider>
    </Provider>
  )
}

export const useTheme = () => useContext(AthenaThemeContext)
