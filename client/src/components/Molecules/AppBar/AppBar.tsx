import { useQuery } from '@apollo/react-hooks'
import {
  AppBar as MuiAppBar,
  Box,
  Icon,
  IconButton,
  InputAdornment,
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
    appBar: {
      position: 'fixed',
      zIndex: theme.zIndex.drawer + 1,
      [theme.breakpoints.up('sm')]: {
        top: 0,
      },
      [theme.breakpoints.down('xs')]: {
        bottom: 0,
      },
    },
    title: {
      flexGrow: 1,
    },
    icon: {
      marginRight: theme.spacing(2),
      padding: 0,
      color: theme.palette.primary.contrastText,
    },
    profileButton: {
      padding: 0,
      color: theme.palette.primary.contrastText,
    },
    loadingUser: {
      background: lightBlue[100],
    },
  }
})

export const AppBar: FC = () => {
  const classes = useStyles()
  const width = useWidth()
  const history = useHistory()
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

  const toggleMenuDrawer = () => {
    dispatch({
      type: GlobalActions.setMenuOpen,
      payload: !globalState.menuOpen,
    })
  }

  const openUserMenu = (event: any) => setAnchorEl(event.currentTarget)

  const closeUserMenu = () => setAnchorEl(null)

  const logout = async () => {
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

  const gotoRoute = (route: string) => {
    closeUserMenu()
    history.push(route)
  }

  const selectSquad = (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>,
    child: React.ReactNode
  ) => {
    const { value } = event.target

    dispatch({
      type: GlobalActions.setSelectedSquad,
      payload: value,
    })
  }

  const selectTribe = (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>,
    child: React.ReactNode
  ) => {
    const { value } = event.target

    dispatch({
      type: GlobalActions.setSelectedTribe,
      payload: value,
    })
  }

  useEffect(() => {
    // Hack to force query to run again
    // Sorry, not sorry
  }, [userInfo])

  return (
    <MuiAppBar position='static' className={classes.appBar}>
      <Toolbar>
        {width === 'xs' ? (
          <IconButton className={classes.icon} onClick={toggleMenuDrawer}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Fragment>
            <IconButton className={classes.icon} onClick={() => gotoRoute(`/`)}>
              <Icon component={AthenaIcon} />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Athena
            </Typography>
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
          <Fragment>
            {/* // TODO make components of this selectors */}
            {data.User[0].tribes.length && (
              <Box px={2}>
                <Select
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
            <IconButton className={classes.profileButton} onClick={openUserMenu}>
              <Avataaar user={data.User[0]} />
            </IconButton>
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
              <MenuItem disabled>
                <Typography>{data.User[0].displayName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => gotoRoute(`/user/${userInfo.id}`)}>
                <Typography>Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => gotoRoute('/settings')}>
                <Typography>Settings</Typography>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Typography color='error'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Fragment>
        )}
      </Toolbar>
    </MuiAppBar>
  )
}
