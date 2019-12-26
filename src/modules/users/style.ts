import { makeStyles } from '@material-ui/styles'

import { Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => {
  return {
    fab: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      margin: theme.spacing(2),
    },
    main: {
      padding: theme.spacing(2, 0, 12, 0),
    },
    avatar: {
      background: theme.palette.grey[100],
    },
    pagerBox: {
      padding: theme.spacing(2),
    },
    pagerDrawer: {
      width: `50%`,
    },
  }
})
