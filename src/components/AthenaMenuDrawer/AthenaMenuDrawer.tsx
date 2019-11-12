import { IAthenaMenuDrawer } from './IAthenaMenuDrawer'

import React from 'react'
import clsx from 'clsx'
import { useStyles } from './AthenaMenuDrawerStyling'
import useTheme from '@material-ui/core/styles/useTheme'
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

import { Link, LinkProps } from 'react-router-dom'

import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

export const AthenaMenuDrawer: React.FC<IAthenaMenuDrawer> = ({ menuOpen, toggleMenuDrawer }) => {
  const classes = useStyles()
  const theme = useTheme()

  const routes = [
    {
      name: 'student dashboard',
      link: '/student/dashboard',
    },
    {
      name: 'Login',
      link: '/login',
    },
  ]

  const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link innerRef={ref as any} {...props} />
  ))

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: menuOpen,
        [classes.drawerClose]: !menuOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: menuOpen,
          [classes.drawerClose]: !menuOpen,
        }),
      }}
      open={menuOpen}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={toggleMenuDrawer}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {routes.map((route: any, index) => (
          <ListItem button key={route.link} component={AdapterLink} to={route.link}>
            <ListItemIcon className={classes.ListItemIcon}>
              {index % 2 === 0 ? <AccountBoxIcon /> : <AccountBoxIcon />}
            </ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon className={classes.ListItemIcon}>
              {index % 2 === 0 ? <AccountBoxIcon /> : <AccountBoxIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
