import React, { FC } from 'react'
import { Button, Container, Paper, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core'

import i18n from 'i18next'
import { supportedLanguages } from 'src/i18n'
import { useTheme } from 'src/common/providers/ThemeProvider'
import { FeedbackPointsGraph } from 'src/components/Atoms/graphs'

export const SettingsRoute: FC = () => {
  const { theme, setTheme } = useTheme()

  const toggleDarkMode = (): void => {
    const newThemeStyle = localStorage.getItem('themeStyle') === 'dark' ? 'light' : 'dark'
    setTheme({ palette: { ...theme.palette, type: newThemeStyle } })
  }

  const handleChange = (event: any) => i18n.changeLanguage(event.target.value)

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper>
            <FormControl>
              <InputLabel id="language-select">Language</InputLabel>
              <Select value={i18n.language || 'en'} onChange={handleChange}>
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
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <FeedbackPointsGraph />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
