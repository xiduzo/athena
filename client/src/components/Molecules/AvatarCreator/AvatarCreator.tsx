import {
  AppBar,
  Container,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Paper,
  FormControl,
  InputLabel,
  Button,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import React, { FC, useState, useEffect } from 'react'
import { Avataaar, SlideUp, generateRandomAvatar } from 'src/components/Atoms'
import { IModalBase, IUser, IAvataaar } from 'src/lib/interfaces'
import {
  TopType,
  AccessoriesType,
  HairColor,
  FacialHairType,
  FacialHairColor,
  ClotheType,
  ClotheColor,
  GraphicType,
  EyeType,
  EyebrowType,
  MouthType,
  SkinColor,
} from 'src/lib/enums'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2, 3),
  },
  paper: {
    padding: theme.spacing(2),
  },
  formControl: {
    width: '100%',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

interface IAvatarCreator extends IModalBase {
  user: IUser
}
export const AvatarCreator: FC<IAvatarCreator> = ({ user, isOpen, onClose }) => {
  const classes = useStyles()

  const [ style, setStyle ] = useState<IAvataaar>(generateRandomAvatar() as IAvataaar)

  const handleClose = () => {
    onClose && onClose()
  }

  const changeStyle = (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    const { name, value } = event.target
    if (!name) return

    setStyle({
      ...style,
      [name]: value,
    })
  }

  // object: T
  const renderFormControl = (object: Object, item: string): JSX.Element => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={item}>{item.replace('Type', '')}</InputLabel>
        <Select
          onChange={changeStyle}
          value={style[item]}
          fullWidth
          inputProps={{
            name: item,
            id: item,
          }}
        >
          {Object.keys(object).map((type) => {
            const typeToString = type.toString()
            const text = typeToString.match(/[A-Z][a-z]+/g)
            return (
              <MenuItem key={type} value={type}>
                {text ? text.join(' ') : typeToString}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    )
  }

  useEffect(
    () => {
      if (!user) return
      try {
        const userStyle = JSON.parse(user.avatarStyle)
        setStyle({
          ...userStyle,
        })
      } catch (e) {
        console.log(true)
      }
    },
    [ user ]
  )

  return (
    <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={SlideUp}>
      <AppBar position={`relative`}>
        <Toolbar>
          <IconButton edge='start' autoFocus color='inherit' onClick={handleClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Change avatar
          </Typography>
          <Button color='inherit'>save</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth='md' className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} container justify={'center'}>
            <Avataaar
              user={user}
              avatar={{
                ...style,
                style: { width: '80vw', height: '80vw', maxWidth: `300px`, maxHeight: `300px` },
              }}
            />
          </Grid>
        </Grid>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12} md={6} lg={4} container spacing={2}>
              <Grid item xs={12}>
                {renderFormControl(TopType, 'topType')}
              </Grid>
              <Grid item xs={12}>
                {renderFormControl(AccessoriesType, 'accessoriesType')}
              </Grid>
              <Grid item xs={12}>
                {renderFormControl(HairColor, 'hairColor')}
              </Grid>
              <Grid item xs={12}>
                {renderFormControl(FacialHairType, 'facialHairType')}
              </Grid>
              <Grid item xs={12}>
                {renderFormControl(FacialHairColor, 'facialHairColor')}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={4} container spacing={2}>
              <Grid item xs={12}>
                {renderFormControl(ClotheType, 'clotheType')}
              </Grid>
              <Grid item xs={12}>
                {renderFormControl(ClotheColor, 'clotheColor')}
              </Grid>
              {style.clotheType === ClotheType.GraphicShirt && (
                <Grid item xs={12}>
                  {renderFormControl(GraphicType, 'graphicType')}
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4} container spacing={2}>
              <Grid item xs={12}>
                {renderFormControl(EyeType, 'eyeType')}
              </Grid>
              <Grid item xs={12}>
                {renderFormControl(EyebrowType, 'eyebrowType')}
              </Grid>
              <Grid item xs={12}>
                {renderFormControl(MouthType, 'mouthType')}
              </Grid>
              <Grid item xs={12}>
                {renderFormControl(SkinColor, 'skinColor')}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Dialog>
  )
}
