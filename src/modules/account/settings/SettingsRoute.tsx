import React, { FC } from 'react'
import { useTheme } from 'src/lib/theme'
import { Button } from '@material-ui/core'

export const SettingsRoute: FC = () => {
  const { theme, setTheme } = useTheme()

  const toggleDarkMode = (): void => {
    const newThemeStyle = localStorage.getItem('themeStyle') === 'dark' ? 'light' : 'dark'
    setTheme({ palette: { ...theme.palette, type: newThemeStyle } })
  }

  return (
    <>
      <Button onClick={toggleDarkMode}>Toggle dark mode</Button>
    </>
  )
}
