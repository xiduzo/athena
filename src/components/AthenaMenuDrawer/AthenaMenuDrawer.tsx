import React, { FC, useState } from 'react'
import clsx from 'clsx'
import { useStyles } from './style'
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import { Link, LinkProps } from 'react-router-dom'

import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

export const AthenaMenuDrawer: FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const classes = useStyles()

  const toggleMenuDrawer = () => setMenuOpen(!menuOpen)

  const routes = [
    {
      name: 'student dashboard',
      link: '/student/dashboard',
    },
    {
      name: 'Coordinator agreements',
      link: '/coordinator/agreements',
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
      // className={clsx(classes.drawer, {
      //   [classes.drawerOpen]: menuOpen,
      //   [classes.drawerClose]: !menuOpen,
      // })}
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
      <div className={classes.toolbar}></div>
      <section className={classes.flex}>
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
      </section>
      <section>
        <Divider />
        <List>
          <ListItem
            button
            onClick={toggleMenuDrawer}
            className={clsx(classes.drawerToggleButton, {
              [classes.drawerToggleButtonOpen]: menuOpen,
            })}
          >
            <ListItemIcon className={clsx(classes.drawerToggleButtonIcon)}>
              {menuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemIcon>
          </ListItem>
        </List>
      </section>
    </Drawer>
  )
}
