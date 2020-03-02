import React, { FC, useEffect, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'src/common/providers/AuthProvider'
import {
  Container,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  MenuItem,
  Menu,
  TextField,
} from '@material-ui/core'
import LanguageIcon from '@material-ui/icons/Language'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    padding: theme.spacing(2, 3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: `calc(90vh - ${theme.mixins.toolbar.height || 64}px)`,
  },
}))

export const LoginRoute: FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { userSession } = useAuth()
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm()

  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  useEffect(
    () => {
      if (userSession) history.push('/student/dashboard') // TODO goto dashboard route based on user group
    },
    [ userSession, history ]
  )

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Container maxWidth="lg" className={classes.main}>
      <Card>
        <CardHeader
          title={<Typography variant="h4">titleee</Typography>}
          action={
            <Fragment>
              <IconButton aria-label="settings" onClick={handleClick}>
                <LanguageIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
                {[ '123', '134' ].map((option) => (
                  <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Fragment>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name={`hva-email`}
                  label={`email`}
                  inputRef={register({
                    required: { value: true, message: 'Dit veld is verplicht' },
                    // minLength: { value: 10, message: 'Minimaal 10 charaters' },
                    // maxLength: { value: 20, message: 'Max 20 charaters' },
                  })}
                  error={errors[`hva-email`] ? true : false}
                  helperText={errors[`hva-email`] && (errors[`hva-email`] as any).message}
                  inputProps={{
                    'aria-label': `hva-email`,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name={`hva-password`}
                  label={`password`}
                  type="password"
                  inputRef={register({
                    required: { value: true, message: 'Dit veld is verplicht' },
                    // minLength: { value: 10, message: 'Minimaal 10 charaters' },
                    // maxLength: { value: 20, message: 'Max 20 charaters' },
                  })}
                  error={errors[`hva-password`] ? true : false}
                  helperText={errors[`hva-password`] && (errors[`hva-password`] as any).message}
                  inputProps={{
                    'aria-label': `hva-password`,
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}
