import {
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core'
import clsx from 'clsx'
import React, { FC, forwardRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { LinkProps, NavLink } from 'react-router-dom'
import { useWidth } from 'src/common/hooks'
import { useAuth } from 'src/common/providers'
import { DispatchAction, GlobalActions, IGlobalState, IRootReducer } from 'src/common/redux'
import { routes } from 'src/components'
import { useStyles } from './style'

const AdapterLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <NavLink innerRef={ref as any} {...props} />
))

export const MenuDrawer: FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const width = useWidth()
  const { session } = useAuth()

  const dispatch = useDispatch<DispatchAction>()

  const globalState = useSelector<IRootReducer, IGlobalState>((state: IRootReducer) => state.global)

  const { menuOpen } = globalState

  const toggleMenuDrawer = (): void =>
    dispatch({
      type: GlobalActions.setMenuOpen,
      payload: !menuOpen,
    })

  useEffect((): void => {
    if (width !== 'xs') return

    dispatch({
      type: GlobalActions.setMenuOpen,
      payload: false,
    })
  }, [width, dispatch])

  if (!session) return null

  return (
    <Drawer
      variant={['xs'].indexOf(width) > -1 ? 'temporary' : 'permanent'}
      anchor='left'
      open={menuOpen}
      onClose={toggleMenuDrawer}
      className={clsx(classes.drawer)}
      classes={{
        paper: clsx(classes.paper),
      }}
    >
      <List>
        {routes
          .filter((route) => route.showInMenu)
          .map((route) => (
            <Tooltip
              title={t<string>(route.name)}
              key={route.path}
              placement='right'
              enterDelay={!menuOpen ? 500 : 1000 * 60}
            >
              <ListItem
                button
                key={route.path}
                component={AdapterLink}
                to={route.path}
                className={classes.navLink}
              >
                <ListItemIcon>
                  <Icon component={route.icon} />
                </ListItemIcon>
                <ListItemText primary={t(route.name)} />
              </ListItem>
            </Tooltip>
          ))}
      </List>
    </Drawer>
  )
}
