import { Divider, Drawer, Icon, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import React, { FC, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { LinkProps, NavLink } from 'react-router-dom'
import { useWidth } from 'src/common/hooks/useWidth'
import { useAuth } from 'src/common/providers/AuthProvider'
import { GlobalActions } from 'src/lib/redux/globalReducer'
import { DispatchAction, IRootReducer } from 'src/lib/redux/rootReducer'
import { IRoute, routes } from '../../Routes/links'
import { useStyles } from './style'

const AdapterLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <NavLink innerRef={ref as any} {...props} />
))

export const MenuDrawer: FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const width = useWidth()
  const { userSession } = useAuth()

  const globalState = useSelector((state: IRootReducer) => state.global)
  const dispatch = useDispatch<DispatchAction>()

  const toggleMenuDrawer = () => {
    dispatch({
      type: GlobalActions.setMenuOpen,
      payload: !globalState.menuOpen,
    })
  }

  if (!userSession) return null

  const { menuOpen } = globalState
  return (
    <Drawer
      variant={width !== 'xs' ? 'permanent' : 'temporary'}
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
            <Tooltip title={t(route.name)} key={route.path} placement='right' enterDelay={!menuOpen ? 350 : 1000 * 60}>
              <ListItem button key={route.path} component={AdapterLink} to={route.path} className={classes.navLink}>
                <ListItemIcon className={classes.ListItemIcon}>
                  <Icon component={route.icon} />
                </ListItemIcon>
                <ListItemText primary={t(route.name)} />
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
