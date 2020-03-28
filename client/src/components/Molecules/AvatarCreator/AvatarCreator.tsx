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
    width: '100%',
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
  const [ previousStyle, setPreviousStyle ] = useState<IAvataaar>(style)

  const handleClose = () => {
    onClose && onClose()
  }

  const changeStyle = (item: string, type: string) => {
    const newStyle = {
      ...style,
      [item]: type,
    }
    setStyle(newStyle)
    setPreviousStyle(newStyle)
  }

  const previewStyle = (item: string, type: string) => {
    setPreviousStyle(style)
    setStyle({
      ...style,
      [item]: type,
    })
  }

  const resetPreview = (_: any) => setStyle(previousStyle)

  // object: T
  const renderAvatarPreview = (object: Object, item: string): JSX.Element => {
    return (
      <Grid container>
        {Object.keys(object).map((type) => {
          const typeToString = type.toString()
          const text = typeToString.match(/[A-Z][a-z]+/g)
          console.log(type)
          return (
            <Grid
              item
              xs={2}
              onClick={() => changeStyle(item, type)}
              onMouseEnter={() => previewStyle(item, type)}
              onMouseLeave={resetPreview}
            >
              <Avataaar
                key={type}
                avatar={{
                  ...style,
                  style: { width: '100px', height: '100px' },
                  [item]: type,
                }}
              />
              <span>{text ? text.join(' ') : typeToString}</span>
            </Grid>
          )
        })}
      </Grid>
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
    <Dialog fullScreen open={true} onClose={handleClose} TransitionComponent={SlideUp}>
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
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {renderAvatarPreview(SkinColor, 'skinColor')}
              {renderAvatarPreview(TopType, 'topType')}
              {renderAvatarPreview(AccessoriesType, 'accessoriesType')}
              {renderAvatarPreview(HairColor, 'hairColor')}
              {renderAvatarPreview(FacialHairType, 'facialHairType')}
              {renderAvatarPreview(FacialHairColor, 'facialHairColor')}
              {renderAvatarPreview(ClotheType, 'clotheType')}
              {renderAvatarPreview(ClotheColor, 'clotheColor')}
              {renderAvatarPreview(GraphicType, 'graphicType')}
              {renderAvatarPreview(EyeType, 'eyebrowType')}
              {renderAvatarPreview(EyebrowType, 'eyeType')}
              {renderAvatarPreview(MouthType, 'mouthType')}
              {renderAvatarPreview(GraphicType, 'graphicType')}
              {renderAvatarPreview(GraphicType, 'graphicType')}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  )
}
