import React, { FC, useState, useEffect } from 'react'
import { Container, Paper, FormControl, InputLabel, Select, MenuItem, Grid, Switch } from '@material-ui/core'

import i18n from 'i18next'
import { supportedLanguages } from 'src/i18n'
import { useTheme } from 'src/common/providers/ThemeProvider'
import { FeedbackPointsGraph } from 'src/components/Atoms/graphs'
import { useSelector, useDispatch } from 'react-redux'
import { IRootReducer, DispatchAction } from 'src/lib/redux/rootReducer'
import { GlobalActions } from 'src/lib/redux/globalReducer'

// export const useStyles = makeStyles((_: Theme) => ({
// }))

export const Settings: FC = () => {
  // const { classes } = useStyles()
  const { theme, setTheme } = useTheme()

  const globalState = useSelector((state: IRootReducer) => state.global)
  const dispatch = useDispatch<DispatchAction>()

  const [ selectedLanguage, setSelectedLanguage ] = useState<string>(i18n.language)

  const toggleDarkMode = (): void => {
    const newThemeStyle = globalState.themeMode === 'dark' ? 'light' : 'dark'
    setTheme({ palette: { ...theme.palette, type: newThemeStyle } })
  }

  const toggleHotkeys = () => {
    dispatch({
      type: GlobalActions.setHotkeysEnabled,
      payload: !globalState.hotkeysEnabled,
    })
  }

  const changeLanguage = (event: any) => {
    const { target } = event
    const { value } = target

    console.log(value)
    dispatch({
      type: GlobalActions.setLanguage,
      payload: value,
    })

    setSelectedLanguage(value)
    i18n.changeLanguage(value)
  }

  useEffect(
    () => {
      if (!i18n.language && selectedLanguage) return

      setSelectedLanguage(i18n.language)
    },
    [ selectedLanguage ]
  )

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper>
            <FormControl>
              <InputLabel id='language-select'>Language</InputLabel>
              <Select value={selectedLanguage || 'en'} onChange={changeLanguage}>
                {supportedLanguages &&
                  supportedLanguages.map((language) => (
                    <MenuItem value={language} key={language}>
                      {language}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Switch color='primary' checked={globalState.hotkeysEnabled} onChange={toggleHotkeys} />
            <Switch checked={globalState.themeMode === 'dark'} onChange={toggleDarkMode} />
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
