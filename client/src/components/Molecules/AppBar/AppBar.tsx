import { AppBar as MuiAppBar, Button, Icon, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import MenuIcon from '@material-ui/icons/Menu'
import { Auth } from 'aws-amplify'
import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useWidth } from 'src/common/hooks'
import { useAuth } from 'src/common/providers'
import { HotkeysIndicator } from 'src/components'
import { AthenaIcon } from 'src/lib/icons'
import { useStyles } from './style'

export const AppBar: FC = () => {
  const classes = useStyles()
  const width = useWidth()
  const { setCredentials, setSession } = useAuth()

  const [ anchorEl, setAnchorEl ] = useState(null)

  const history = useHistory()

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = async () => {
    handleClose()
    await Auth.signOut()
    setCredentials(null)
    setSession(null)
    history.push('/')
  }

  const gotoRoute = (route: string) => {
    handleClose()
    history.push(route)
  }

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
        <HotkeysIndicator />

        <Button onClick={handleMenu} startIcon={<AccountBoxIcon />}>
          Sander Boer
        </Button>

        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={() => gotoRoute('/account/settings')}>Settings</MenuItem>
          <MenuItem onClick={logout}>
            <Typography color='error'>Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </MuiAppBar>
  )
}
