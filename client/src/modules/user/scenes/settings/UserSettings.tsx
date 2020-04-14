import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  ThemeOptions,
} from '@material-ui/core'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from 'src/common/providers'
import { DispatchAction, GlobalActions, IRootReducer } from 'src/common/redux'
import { FeedbackPointsGraph } from 'src/components'
import { supportedLanguages } from 'src/i18n'

export const UserSettings: FC = () => {
  const { theme, setTheme } = useTheme()

  const globalState = useSelector((state: IRootReducer) => state.global)
  const dispatch = useDispatch<DispatchAction>()

  const toggleDarkMode = (): void => {
    const newTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: globalState.themeType === 'dark' ? 'light' : 'dark',
      },
    }
    dispatch({
      type: GlobalActions.setThemeType,
      payload: newTheme.palette.type,
    })
    setTheme(newTheme as ThemeOptions)
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

    dispatch({
      type: GlobalActions.setLanguage,
      payload: value,
    })
  }

  const { hotkeysEnabled, language, themeType: themeMode } = globalState

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper>
            <FormControl>
              <InputLabel id='language-select'>Language</InputLabel>
              <Select value={language} onChange={changeLanguage}>
                {supportedLanguages &&
                  supportedLanguages.map((supportedLanguage) => (
                    <MenuItem value={supportedLanguage} key={supportedLanguage}>
                      {supportedLanguage}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Switch color='primary' checked={hotkeysEnabled} onChange={toggleHotkeys} />
            <Switch checked={themeMode === 'dark'} onChange={toggleDarkMode} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <FeedbackPointsGraph agreements={[]} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
