import React, { FC, useState } from 'react'

import { AppBar as MuiAppBar, Toolbar, Typography, Button, Icon, Menu, MenuItem, IconButton } from '@material-ui/core'
import { useStyles } from './style'

import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { useAuth } from 'src/lib/auth'
import { AthenaIcon } from 'src/lib/icons'
import { useHistory } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import { useWidth } from 'src/lib/hooks/useWidth'

export const AppBar: FC = () => {
  const classes = useStyles()
  const width = useWidth()

  const { setAuthToken } = useAuth()
  const [ anchorEl, setAnchorEl ] = useState(null)

  const history = useHistory()

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const gotoRoute = (route: string) => {
    handleClose()
    history.push(route)
  }

  const setToken = () => setAuthToken('1234')

  return (
    <MuiAppBar position="static" className={classes.appBar}>
      <Toolbar>
        {width === 'xs' ? (
          <IconButton className={classes.icon}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Icon component={AthenaIcon} className={classes.icon} />
        )}
        <Typography variant="h6" className={classes.title}>
          Athena
        </Typography>
        <Button onClick={setToken}>set token</Button>

        <Button onClick={handleMenu} startIcon={<AccountBoxIcon />}>
          Sander Boer
        </Button>

        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={() => gotoRoute('/account/settings')}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography color="error">Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </MuiAppBar>
  )
}
