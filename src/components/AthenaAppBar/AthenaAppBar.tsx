import React, { FC } from 'react'

import { AppBar, Toolbar, IconButton, Typography, Button, Icon } from '@material-ui/core'
import { useStyles } from './style'

import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { useAuth } from 'src/lib/auth'
import { AthenaIcon } from 'src/lib/icons'

export const AthenaAppBar: FC = () => {
  const classes = useStyles()
  const { setAuthToken } = useAuth()

  const setToken = () => setAuthToken('1234')

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <Icon color='inherit' component={AthenaIcon} className={classes.icon} />
        <Typography color='inherit' variant='h6' className={classes.title}>
          Athena
        </Typography>
        <Button onClick={setToken}>set token</Button>

        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='My account'
        >
          <AccountBoxIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
