import { useMutation } from '@apollo/react-hooks'
import {
  AppBar,
  Button,
  Container,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Toolbar,
  Typography,
  Box,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Pagination, Skeleton } from '@material-ui/lab'
import clsx from 'clsx'
import React, { FC, useEffect, useState } from 'react'
import { useWidth } from 'src/common/hooks'
import { MERGE_USER } from 'src/common/services'
import { Avataaar, generateRandomAvatar } from 'src/components'
import {
  AccessoriesType,
  ClotheColor,
  ClotheType,
  EyebrowType,
  EyeType,
  FacialHairColor,
  FacialHairType,
  GraphicType,
  HairColor,
  MouthType,
  SkinColor,
  TopType,
} from 'src/lib/enums'
import { IAvataaar, IModalBase, IUser } from 'src/lib/interfaces'
import ShuffleIcon from '@material-ui/icons/Shuffle'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2, 3),
    height: `100%`,
  },
  content: {
    height: `inherit`,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  isNotSelected: {
    border: '1px solid transparent',
  },
  itemSelector: {
    paddingBottom: theme.spacing(1),
  },
}))

interface IAvatarCreator extends IModalBase {
  user: IUser
}

export const AvatarCreator: FC<IAvatarCreator> = ({ user, isOpen, onClose }) => {
  const classes = useStyles()
  const width = useWidth()

  const [style, setStyle] = useState<IAvataaar>({} as IAvataaar)
  const [previousStyle, setPreviousStyle] = useState<IAvataaar | null>(null)
  const [selectedPage, setSelectedPage] = useState(1)
  const [amountToRender, setAmountToRender] = useState(0)
  const [pagesToRender, setPagesToRender] = useState(0)
  const [types] = useState<{ type: Object; name: string }[]>([
    {
      type: SkinColor,
      name: 'skinColor',
    },
    {
      type: TopType,
      name: 'topType',
    },
    {
      type: AccessoriesType,
      name: 'accessoriesType',
    },
    {
      type: HairColor,
      name: 'hairColor',
    },
    {
      type: FacialHairType,
      name: 'facialHairType',
    },
    {
      type: FacialHairColor,
      name: 'facialHairColor',
    },
    {
      type: ClotheType,
      name: 'clotheType',
    },
    {
      type: ClotheColor,
      name: 'clotheColor',
    },
    {
      type: GraphicType,
      name: 'graphicType',
    },
    {
      type: EyeType,
      name: 'eyeType',
    },
    {
      type: EyebrowType,
      name: 'eyebrowType',
    },
    {
      type: MouthType,
      name: 'mouthType',
    },
  ])
  const [selectedType, setSelectedType] = useState<string>(types[0].name)
  const [MergeUser] = useMutation(MERGE_USER)

  const handleClose = async () => {
    setPreviousStyle(null)
    onClose && onClose()
  }

  const saveNewAvatar = async () => {
    await MergeUser({
      variables: {
        ...user,
        avatarStyle: JSON.stringify(style),
      },
    })
    handleClose()
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
    if (!previousStyle) setPreviousStyle(style)
    setStyle({
      ...style,
      [item]: type,
    })
  }

  const resetPreview = (_: any) => {
    if (previousStyle) setStyle(previousStyle)
  }

  const handleTypeChange = (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ): void => {
    const { value } = event.target
    const type = value as string
    setSelectedType(type)
    setSelectedPage(1)
  }

  const createRandomAvatar = (): void => {
    const randomAvatar = generateRandomAvatar()
    const newStyle = {
      ...style,
      ...randomAvatar,
    }
    setStyle(newStyle)
    setPreviousStyle(null)
    // Refresh previews
    const storedSelectedType = selectedType
    setSelectedType('')
    setTimeout(() => {
      setSelectedType(storedSelectedType)
    }, 0)
  }

  const renderAvatarPreviews = (): JSX.Element => {
    const typeToRender = types.find((type) => type.name === selectedType)

    // if (!typeToRender) return null
    return (
      <Grid container spacing={2}>
        {!typeToRender
          ? Array.from({ length: amountToRender }).map((_: any, index: number) => (
              <Grid key={index} item xs={4} md={3} lg={2} component={Button} disabled>
                <Skeleton variant='circle' width={100} height={100} />
              </Grid>
            ))
          : Object.keys(typeToRender.type)
              .slice((selectedPage - 1) * amountToRender, selectedPage * amountToRender)
              .map((type) => {
                const isSelected = style[typeToRender.name] === type
                return (
                  <Grid
                    className={clsx({
                      [classes.isNotSelected]: !isSelected,
                    })}
                    component={Button}
                    variant={isSelected ? 'outlined' : 'text'}
                    color={`primary`}
                    key={type}
                    item
                    xs={4}
                    md={3}
                    lg={2}
                    onClick={() => changeStyle(typeToRender.name, type)}
                    onMouseEnter={() => previewStyle(typeToRender.name, type)}
                    onMouseLeave={resetPreview}
                  >
                    <Avataaar
                      key={type}
                      avatar={{
                        ...style,
                        style: { width: '100px', height: '100px' },
                        [typeToRender.name]: type,
                      }}
                    />
                  </Grid>
                )
              })}
      </Grid>
    )
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number): void =>
    setSelectedPage(page)

  useEffect((): void => {
    if (!user) return
    try {
      const userStyle = JSON.parse(user.avatarStyle)
      setStyle({
        ...userStyle,
      })
    } catch (e) {
      console.log(true)
    }
  }, [user, isOpen])

  useEffect((): void => {
    if (!width) return
    switch (width) {
      case 'xs':
      case 'sm':
        setAmountToRender(9)
        return
      case 'md':
        setAmountToRender(12)
        return
      case 'lg':
      case 'xl':
        setAmountToRender(6)
        return
    }
  }, [width])

  useEffect((): void => {
    const typeToRender = types.find((type) => type.name === selectedType)

    if (!typeToRender) return
    setPagesToRender(Math.ceil(Object.keys(typeToRender.type).length / amountToRender))
  }, [amountToRender, types, selectedType])

  return (
    <Dialog fullScreen open={isOpen} onClose={handleClose}>
      <AppBar position={`relative`}>
        <Toolbar>
          <IconButton
            edge='start'
            autoFocus
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Change avatar
          </Typography>
          <Button color='inherit' onClick={saveNewAvatar}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth='md' className={classes.root}>
        <Grid container className={classes.content} justify={`space-between`}>
          <Grid item xs={12} container justify={'center'}>
            <Avataaar
              user={user}
              avatar={{
                ...style,
                style: { width: '80vw', height: '80vw', maxWidth: `450px`, maxHeight: `450px` },
              }}
            />
          </Grid>
          <Grid item xs={12} container>
            <Grid
              className={classes.itemSelector}
              item
              xs={12}
              container
              alignItems={`center`}
              justify={`space-between`}
              onMouseEnter={resetPreview}
            >
              <Box>
                <Grid container alignItems={`center`}>
                  {!selectedType ? (
                    <Skeleton variant='text' width={100} height={48} />
                  ) : (
                    <Select value={selectedType} onChange={handleTypeChange}>
                      {types.map((option) => {
                        const noType = option.name.replace('Type', '')
                        const text = noType
                          .split(/(?=[A-Z])/)
                          .map((s) => s.toLowerCase())
                          .join(' ')
                        return (
                          <MenuItem key={option.name} value={option.name}>
                            {text ? text : option.name}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  )}

                  <IconButton onClick={createRandomAvatar}>
                    <ShuffleIcon />
                  </IconButton>
                </Grid>
              </Box>
              <Pagination
                onChange={handlePageChange}
                color={'primary'}
                count={pagesToRender}
                defaultPage={1}
                page={selectedPage}
                hidePrevButton
                hideNextButton
              />
            </Grid>
            {renderAvatarPreviews()}
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  )
}
