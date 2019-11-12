import { IAthenaAppBar } from './IAthenaAppBar'

import React from 'react'
import clsx from 'clsx'

import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { useStyles } from './AthenaAppBarStyling'

import AccountBoxIcon from '@material-ui/icons/AccountBox'
import MenuIcon from '@material-ui/icons/Menu'
import { useAuth } from 'src/lib/auth'

export const AthenaAppBar: React.FC<IAthenaAppBar> = ({ menuOpen, toggleMenuDrawer }) => {
  const classes = useStyles()
  const { setAuthToken } = useAuth()

  const setToken = () => {
    setAuthToken && setAuthToken('1234')
  }

  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: menuOpen,
      })}
    >
      <Toolbar>
        <IconButton
          edge='start'
          aria-label='Toggle menu'
          color='inherit'
          onClick={toggleMenuDrawer}
          className={clsx(classes.menuButton, {
            [classes.hide]: menuOpen,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' className={classes.title}>
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
