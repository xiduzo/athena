import { makeStyles } from '@material-ui/styles'

import { Theme } from '@material-ui/core'

const drawerWidth = 240

export const useStyles = makeStyles((theme: Theme) => {
  return {
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    ListItemIcon: {
      paddingLeft: theme.spacing(1),
    },
    flex: {
      flexGrow: 1,
      overflow: 'hidden',
    },
    drawerToggleButton: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    drawerToggleButtonIcon: {
      minWidth: 0,
      transform: 'rotate(-90deg)',
    },
    drawerToggleButtonOpen: {
      justifyContent: 'flex-end',
    },
    navLink: {
      '&.active': {
        // TODO: add active state
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    },
  }
})
