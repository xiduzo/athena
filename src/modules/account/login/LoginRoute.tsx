import React, { FC, useEffect, Fragment } from 'react'
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
  Tooltip,
} from '@material-ui/core'
import LanguageIcon from '@material-ui/icons/Language'
import { useForm } from 'react-hook-form'
import { Avataaar } from 'src/components/Atoms/Avataaar'
import { IAvataaar } from 'src/components/Atoms/Avataaar/interface'
import { TopType } from 'src/components/Atoms/Avataaar/enums/TopType'
import { AccessoriesType } from 'src/components/Atoms/Avataaar/enums/AccessoriesType'
import { HairColor } from 'src/components/Atoms/Avataaar/enums/HairColor'
import { FacialHairType } from 'src/components/Atoms/Avataaar/enums/FacialHairType'
import { FacialHairColor } from 'src/components/Atoms/Avataaar/enums/FacialHairColor'
import { ClotheType } from 'src/components/Atoms/Avataaar/enums/ClotheType'
import { ClotheColor } from 'src/components/Atoms/Avataaar/enums/ClotheColor'
import { EyeType } from 'src/components/Atoms/Avataaar/enums/EyeType'
import { EyebrowType } from 'src/components/Atoms/Avataaar/enums/EyebrowType'
import { MouthType } from 'src/components/Atoms/Avataaar/enums/MouthType'
import { SkinColor } from 'src/components/Atoms/Avataaar/enums/SkinColor'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    padding: theme.spacing(2, 3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: `calc(90vh - ${theme.mixins.toolbar.height || 64}px)`,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}))

export const LoginRoute: FC = () => {
  const classes = useStyles()
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

  // https://getavataaars.com/?accessoriesType=Round&avatarStyle=Circle&clotheColor=Blue03&clotheType=Hoodie&eyeType=Default&eyebrowType=Default&facialHairColor=Auburn&facialHairType=BeardLight&hairColor=Brown&mouthType=Default&skinColor=Light&topType=ShortHairShortWaved
  const baseAvataaar: IAvataaar = {
    avatarStyle: 'Circle',
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

  const avatarToUse = Math.random() > 0.5 ? baseAvataaar : Math.random() > 0.5 ? fancyAvataaar : casualAvataaar

  const handleOpen = () => {
    console.log(`EASTER EGG FOUND, NOICEEEE`)
  }

  return (
    <Container maxWidth='lg' className={classes.main}>
      <Card>
        <CardHeader
          avatar={
            <Tooltip title={`greeting`} enterDelay={5000} arrow placement='top' onOpen={handleOpen}>
              <div>
                <Avataaar {...avatarToUse} />
              </div>
            </Tooltip>
          }
          title={<Typography variant='h4'>Login to athena</Typography>}
          action={
            <Fragment>
              <IconButton aria-label='settings' onClick={handleClick}>
                <LanguageIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
                {[ 'NL', 'ENG' ].map((option) => (
                  <MenuItem key={option} selected={option === 'ENG'} onClick={handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Fragment>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
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
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}
