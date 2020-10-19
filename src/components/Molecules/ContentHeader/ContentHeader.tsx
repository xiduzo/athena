import { useQuery } from '@apollo/react-hooks'
import {
  Box,
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  Menu,
  MenuItem,
  Select,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { lightBlue } from '@material-ui/core/colors'
import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import DialpadIcon from '@material-ui/icons/Dialpad'
import MenuIcon from '@material-ui/icons/Menu'
import { Skeleton } from '@material-ui/lab'
import { Auth } from 'aws-amplify'
import gql from 'graphql-tag'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useWidth } from 'src/common/hooks'
import { useAuth } from 'src/common/providers'
import { DispatchAction, GlobalActions, IRootReducer } from 'src/common/redux'
import { Avataaar } from 'src/components'
import { AthenaIcon } from 'src/lib/icons'
import { ISquad, ITribe } from 'src/lib/interfaces'

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      display: 'flex',
      padding: theme.spacing(0, 2),
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'space-between',
      },
    },
    rightContent: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      '& >div': {
        display: 'flex',
        alignItems: 'center',
      },
    },
    icon: {
      marginRight: theme.spacing(2),
    },
    loadingUser: {
      background: lightBlue[100],
    },
    menuButton: {
      textTransform: 'lowercase',
    },
    menuButtonText: {
      marginRight: theme.spacing(1),
      padding: theme.spacing(0, 1),
    },
  }
})

export const ContentHeader: FC = () => {
  const classes = useStyles()
  const width = useWidth()
  const history = useHistory()
  const { t } = useTranslation()
  const { setCredentials, setSession, userInfo, setUserInfo } = useAuth()

  const [anchorEl, setAnchorEl] = useState(null)

  const globalState = useSelector((state: IRootReducer) => state.global)

  const { loading, error, data } = useQuery(
    gql`
      query UserTribesAndSquads($id: String!) {
        User(filter: { id: $id }) {
          id
          displayName
          avatarStyle
          squads {
            id
            name
          }
          tribes {
            id
            name
          }
        }
      }
    `,
    {
      variables: {
        id: userInfo ? userInfo.id : `this-id-will-never-exist`, // TODO fix this hack
      },
    }
  )

  const dispatch = useDispatch<DispatchAction>()

  const toggleMenuDrawer = (): void =>
    dispatch({
      type: GlobalActions.setMenuOpen,
      payload: !globalState.menuOpen,
    })

  const openUserMenu = (event: any): void => setAnchorEl(event.currentTarget)

  const closeUserMenu = (): void => setAnchorEl(null)

  const logout = async (): Promise<void> => {
    closeUserMenu()
    await Auth.signOut()
    // Clear all user details from auth provider and state manager
    setCredentials(null)
    setSession(null)
    setUserInfo(null)
    dispatch({
      type: GlobalActions.setUser,
      payload: null,
    })
    history.push('/')
  }

  const gotoRoute = (route: string): void => {
    closeUserMenu()
    history.push(route)
  }

  const selectSquad = (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>,
    _: React.ReactNode
  ): void => {
    const { value } = event.target

    dispatch({
      type: GlobalActions.setSelectedSquad,
      payload: value,
    })
  }

  const selectTribe = (
    event: React.ChangeEvent<{
      name?: string
      value: unknown
    }>,
    _: React.ReactNode
  ): void => {
    const { value } = event.target

    dispatch({
      type: GlobalActions.setSelectedTribe,
      payload: value,
    })
  }

  useEffect(() => {
    if (globalState.selectedSquad) return
    if (!data?.User[0]?.squads[0].id) return

    dispatch({
      type: GlobalActions.setSelectedSquad,
      payload: data?.User[0]?.squads[0].id,
    })
  }, [globalState.selectedSquad, data, dispatch])

  useEffect(() => {
    if (globalState.selectedTribe) return
    if (!data?.User[0]?.tribes[0].id) return

    dispatch({
      type: GlobalActions.setSelectedTribe,
      payload: data?.User[0]?.tribes[0].id,
    })
  }, [globalState.selectedTribe, data, dispatch])

  useEffect(() => {
    // Hack to force query to run again
    // Sorry, not sorry
  }, [userInfo])

  return (
    <Toolbar className={classes.root}>
      {width === 'xs' ? (
        <IconButton className={classes.icon} onClick={toggleMenuDrawer}>
          <MenuIcon />
        </IconButton>
      ) : (
        <Fragment>
          <IconButton name={`Home`} className={classes.icon} onClick={() => gotoRoute(`/`)}>
            <Icon component={AthenaIcon} />
          </IconButton>
        </Fragment>
      )}
      {loading ? (
        <Skeleton
          animation='wave'
          variant='circle'
          width={42}
          height={42}
          className={classes.loadingUser}
        />
      ) : error ? (
        //error
        ''
      ) : !data.User.length ? (
        // empty
        ''
      ) : (
        <Box className={classes.rightContent}>
          {/* // TODO make components of this selectors */}
          {data.User[0].tribes.length && (
            <Box px={2}>
              <Select
                disabled={data.User[0].tribes.length <= 1}
                id='tribe-select'
                onChange={selectTribe}
                value={globalState.selectedTribe}
                startAdornment={
                  <InputAdornment position='start'>
                    <DialpadIcon />
                  </InputAdornment>
                }
              >
                {data.User[0].tribes.map((tribe: ITribe) => (
                  <MenuItem key={tribe.id} value={tribe.id}>
                    {tribe.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}
          {data.User[0].squads.length && (
            <Box px={2}>
              <Select
                disabled={data.User[0].squads.length <= 1}
                id='squad-select'
                onChange={selectSquad}
                value={globalState.selectedSquad}
                startAdornment={
                  <InputAdornment position='start'>
                    <BubbleChartIcon />
                  </InputAdornment>
                }
              >
                {data.User[0].squads.map((squad: ISquad) => (
                  <MenuItem key={squad.id} value={squad.id}>
                    {squad.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}
          <Button onClick={openUserMenu} className={classes.menuButton}>
            <Typography className={classes.menuButtonText}>{data.User[0].displayName}</Typography>
            <Avataaar user={data.User[0]} avatar={{ style: { width: '36px', height: '36px' } }} />
          </Button>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={Boolean(anchorEl)}
            onClose={closeUserMenu}
          >
            <MenuItem onClick={() => gotoRoute(`/user/${userInfo.id}`)}>
              <Typography>{t('profile')}</Typography>
            </MenuItem>
            <MenuItem onClick={() => gotoRoute('/settings')}>
              <Typography>{t('settings')}</Typography>
            </MenuItem>
            <MenuItem onClick={logout}>
              <Typography color='error'>{t('signOut')}</Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </Toolbar>
  )
}
