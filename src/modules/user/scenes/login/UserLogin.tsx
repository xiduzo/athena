import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core'
import LanguageIcon from '@material-ui/icons/Language'
import { Auth } from 'aws-amplify'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'src/common/providers'
import { snackbarWrapper } from 'src/common/utils'
import { Avataaar } from 'src/components'
import {
  AccessoriesType,
  ClotheColor,
  ClotheType,
  EyebrowType,
  EyeType,
  FacialHairColor,
  FacialHairType,
  HairColor,
  MouthType,
  SkinColor,
  TopType,
} from 'src/lib/enums'
import { IAvataaar } from 'src/lib/interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2, 3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: `calc(90vh - ${theme.mixins.toolbar.height || 64}px)`,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  linearProgress: {
    minHeight: theme.spacing(4),
  },
}))

export const UserLogin: FC = () => {
  const classes = useStyles()
  const history = useHistory()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [loginButtonEnabled, setLoginButtonEnabled] = useState(true)

  const { session, setCredentials, setSession } = useAuth()

  const { register, handleSubmit, errors } = useForm()

  useEffect(() => {
    if (!session) return

    const previousRoute = history?.location?.state as { referer?: string }

    if (previousRoute?.referer) return history.push(previousRoute.referer)

    history.push('/') // for safety
  }, [session, history])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onLoginSubmit = (
    data: any,
    event: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    if (event) event.preventDefault()
    const { username, password } = data
    setLoginButtonEnabled(false)
    Auth.signIn(username, password)
      .then(() => {
        setLoginButtonEnabled(true)
        snackbarWrapper.info(`Welcome back`)

        Auth.currentCredentials().then(setCredentials)
        Auth.currentSession().then(setSession)
      })
      .catch((error) => {
        setLoginButtonEnabled(true)
        snackbarWrapper.error(error.message)
      })
  }

  // https://getavataaars.com/?accessoriesType=Round&avatarStyle=Circle&clotheColor=Blue03&clotheType=Hoodie&eyeType=Default&eyebrowType=Default&facialHairColor=Auburn&facialHairType=BeardLight&hairColor=Brown&mouthType=Default&skinColor=Light&topType=ShortHairShortWaved
  const baseAvataaar: IAvataaar = {
    style: { width: '75px', height: '75px' },
    topType: TopType.ShortHairShortWaved,
    accessoriesType: AccessoriesType.Round,
    hairColor: HairColor.Brown,
    facialHairType: FacialHairType.BeardLight,
    facialHairColor: FacialHairColor.Auburn,
    clotheType: ClotheType.Hoodie,
    clotheColor: ClotheColor.Blue03,
    eyeType: EyeType.Default,
    eyebrowType: EyebrowType.Default,
    mouthType: MouthType.Default,
    skinColor: SkinColor.Light,
  }

  const fancyAvataaar: IAvataaar = {
    ...baseAvataaar,
    clotheType: ClotheType.CollarSweater,
    clotheColor: ClotheColor.Red,
  }

  const casualAvataaar: IAvataaar = {
    ...baseAvataaar,
    clotheType: ClotheType.ShirtCrewNeck,
    clotheColor: ClotheColor.White,
  }

  const avatarToUse =
    Math.random() > 0.5 ? baseAvataaar : Math.random() > 0.5 ? fancyAvataaar : casualAvataaar

  const handleOpen = () => {
    console.log(`EASTER EGG FOUND, NOICEEEE`)
  }

  return (
    <Container maxWidth='xl' className={classes.root}>
      <Grid container justify='center' alignItems='center'>
        <Grid item xs={12} sm={9} md={7} lg={5} xl={3}>
          <Card>
            <CardHeader
              avatar={
                <Tooltip
                  title={`greeting`}
                  enterDelay={5000}
                  arrow
                  placement='top'
                  onOpen={handleOpen}
                >
                  <div>
                    <Avataaar avatar={avatarToUse} />
                  </div>
                </Tooltip>
              }
              title={<Typography variant='h4'>Login to athena</Typography>}
              action={
                <Fragment>
                  <IconButton aria-label='settings' onClick={handleClick}>
                    <LanguageIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {['NL', 'ENG'].map((option) => (
                      <MenuItem key={option} selected={option === 'ENG'} onClick={handleClose}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </Fragment>
              }
            />
            <CardContent>
              <form onSubmit={handleSubmit(onLoginSubmit)} autoComplete='off'>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name={`username`}
                      label={`hva-email`}
                      inputRef={register({
                        required: { value: true, message: 'Dit veld is verplicht' },
                        // minLength: { value: 10, message: 'Minimaal 10 charaters' },
                        // maxLength: { value: 20, message: 'Max 20 charaters' },
                      })}
                      // error={errors[`hva-email`] ? true : false}
                      // helperText={errors[`hva-email`] && (errors[`hva-email`] as any).message}
                      inputProps={{
                        'aria-label': `hva-email`,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name={`password`}
                      label={`password`}
                      type='password'
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
                  <Grid item xs={12}>
                    {loginButtonEnabled ? (
                      <Button
                        disabled={!loginButtonEnabled}
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit(onLoginSubmit)}
                      >
                        Login
                      </Button>
                    ) : (
                      <Box my={2}>
                        <LinearProgress />
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
