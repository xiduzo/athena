import { makeStyles } from '@material-ui/styles'

import { Theme } from '@material-ui/core'
import { fade } from '@material-ui/core/styles'

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
      overflowY: 'scroll',
      overflowX: 'hidden',
      height: 'inherit',
      maxHeight: '100%',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
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
      borderRight: '2px solid transparent',
      transition: theme.transitions.create([ 'borderColor', 'background' ], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      '&.active': {
        // TODO: add active state
        borderColor: theme.palette.primary.main,
        background: fade(theme.palette.primary.main, 0.25),
        // color: theme.palette.primary.contrastText,
      },
      '&:not(.active):hover': {
        borderColor: theme.palette.grey[300],
      },
      '&:not(.active):focus': {
        borderColor: theme.palette.grey[400],
      },
    },
  }
})
