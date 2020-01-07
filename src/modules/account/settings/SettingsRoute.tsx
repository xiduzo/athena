import React, { FC } from 'react'
import { useTheme } from 'src/lib/theme'
import { Button, Container, Paper, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

import i18n from 'i18next'
import { supportedLanguages } from 'src/i18n'

export const SettingsRoute: FC = () => {
  const { theme, setTheme } = useTheme()

  const toggleDarkMode = (): void => {
    const newThemeStyle = localStorage.getItem('themeStyle') === 'dark' ? 'light' : 'dark'
    setTheme({ palette: { ...theme.palette, type: newThemeStyle } })
  }

  const handleChange = (event: any) => i18n.changeLanguage(event.target.value)

  return (
    <Container maxWidth="lg">
      <Paper>
        <FormControl>
          <InputLabel id="language-select">Language</InputLabel>
          <Select value={i18n.language || 'en'} onChange={handleChange}>
            {console.log(i18n.languages)}
            {supportedLanguages &&
              supportedLanguages.map((language) => (
                <MenuItem value={language} key={language}>
                  {language}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button onClick={toggleDarkMode}>Toggle dark mode</Button>
      </Paper>
    </Container>
  )
}
