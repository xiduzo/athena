import React, { FC, useState, useEffect, forwardRef } from 'react'
import clsx from 'clsx'
import { useStyles } from './style'
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Icon, Tooltip } from '@material-ui/core'

import { NavLink, LinkProps } from 'react-router-dom'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { routes, IRoute } from '../../Routes/links'

const AdapterLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <NavLink innerRef={ref as any} {...props} />
))

export const MenuDrawer: FC = () => {
  const classes = useStyles()

  const [ menuOpen, setMenuOpen ] = useState<boolean>(false)

  const toggleMenuDrawer = () => {
    localStorage.setItem('menuState', JSON.stringify(!menuOpen))
    setMenuOpen(!menuOpen)
  }

  useEffect(
    () => {
      const localState = JSON.parse(localStorage.getItem('menuState') as string)
      setMenuOpen(localState)
    },
    [ setMenuOpen ]
  )

  return (
    <Drawer
      variant="permanent"
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
    >
      <div className={classes.toolbar} />
      <section className={classes.flex}>
        <List>
          {routes.filter((route: IRoute) => route.showInMenu).map((route: IRoute) => (
            <Tooltip title={route.name} key={route.path} placement="right" enterDelay={!menuOpen ? 350 : 1000 * 60}>
              <ListItem button key={route.path} component={AdapterLink} to={route.path} className={classes.navLink}>
                <ListItemIcon className={classes.ListItemIcon}>
                  <Icon component={route.icon} />
                </ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </section>
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
    </Drawer>
  )
}
