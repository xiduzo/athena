import { useQuery } from '@apollo/react-hooks'
import {
  AppBar as MuiAppBar,
  Button,
  Icon,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import MenuIcon from '@material-ui/icons/Menu'
import { Skeleton } from '@material-ui/lab'
import { Auth } from 'aws-amplify'
import gql from 'graphql-tag'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useWidth } from 'src/common/hooks'
import { useAuth } from 'src/common/providers'
import { DispatchAction, GlobalActions } from 'src/common/redux'
import { AthenaIcon } from 'src/lib/icons'
import { IUser } from 'src/lib/interfaces'

const useStyles = makeStyles((theme: Theme) => {
  return {
    appBar: {
      position: 'fixed',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create([ 'width', 'margin' ], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
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
    },
    profileButton: {
      color: theme.palette.primary.contrastText,
    },
  }
})

export const AppBar: FC = () => {
  const classes = useStyles()
  const width = useWidth()
  const history = useHistory()
  const { setCredentials, setSession, userInfo } = useAuth()

  const [ anchorEl, setAnchorEl ] = useState(null)

  const { loading, error, data } = useQuery(
    gql`
      query User($id: String!) {
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

  const handleMenuClick = (event: any) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const logout = async () => {
    handleClose()
    await Auth.signOut()
    // Clear all user details from auth provider and state manager
    setCredentials(null)
    setSession(null)
    dispatch({
      type: GlobalActions.setUser,
      payload: null,
    })
    history.push('/')
  }

  const gotoRoute = (route: string) => {
    handleClose()
    history.push(route)
  }

  useEffect(
    () => {
      // Hack to force query to run again
      // Sorry, not sorry
    },
    [ userInfo ]
  )

  return (
    <MuiAppBar position='static' className={classes.appBar}>
      <Toolbar>
        {width === 'xs' ? (
          <IconButton className={classes.icon}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Icon component={AthenaIcon} className={classes.icon} />
        )}
        <Typography variant='h6' className={classes.title}>
          Athena
        </Typography>

        {loading ? (
          <Button startIcon={<AccountBoxIcon />}>
            <Skeleton variant='text' style={{ width: '150px' }} />
          </Button>
        ) : error ? (
          //error
          ''
        ) : !data.User.length ? (
          // empty
          ''
        ) : (
          <Fragment>
            <Button className={classes.profileButton} onClick={handleMenuClick} startIcon={<AccountBoxIcon />}>
              {(data.User[0] as IUser).displayName}
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
              onClose={handleClose}
            >
              <MenuItem onClick={() => gotoRoute(`/user/${userInfo.id}`)}>
                <Typography>Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => gotoRoute('/account/settings')}>
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
