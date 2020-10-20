import {
  Drawer,
  fade,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
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
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined'
import { routes } from 'src/components'

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: `66px`,
    },
    flexShrink: 0,
  },
  paper: {
    border: `none`,
    width: `inherit`,
    overflow: `hidden`,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.only('xs')]: {
      justifyContent: `flex-end`,
    },
  },
  navLink: {
    borderLeft: '4px solid transparent',
    transition: theme.transitions.create(['borderColor', 'background'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '&.active': {
      borderColor: theme.palette.primary.main,
      background: fade(theme.palette.primary.main, 0.15),
    },
    '&:not(.active):hover': {
      borderColor: theme.palette.grey[300],
    },
    '&:not(.active):focus': {
      borderColor: theme.palette.grey[400],
    },
  },
}))

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
  const enterDelay = 500

  const toggleMenuDrawer = (): void =>
    dispatch({
      type: GlobalActions.setMenuOpen,
      payload: !menuOpen,
    })

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
              enterDelay={enterDelay}
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
      <List>
        <Tooltip title={t<string>('settings')} placement='right' enterDelay={enterDelay}>
          <ListItem button component={AdapterLink} to={'/settings'} className={classes.navLink}>
            <ListItemIcon>
              <TuneOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t('settings')} />
          </ListItem>
        </Tooltip>
      </List>
    </Drawer>
  )
}
