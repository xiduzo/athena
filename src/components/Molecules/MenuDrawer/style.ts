import { makeStyles } from '@material-ui/styles'

import { Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => {
  return {
    drawer: {
      width: `66px`,
      border: `none`,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      [theme.breakpoints.only('xs')]: {
        width: `75vw`,
      },
    },
    paper: {
      border: `none`,
      width: `inherit`,
      overflow: `hidden`,
      [theme.breakpoints.only('xs')]: {
        justifyContent: `flex-end`,
      },
    },
    drawerToggleButton: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    navLink: {
      borderLeft: '4px solid transparent',
      transition: theme.transitions.create(['borderColor', 'background'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      '&.active': {
        borderColor: theme.palette.primary.main,
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
