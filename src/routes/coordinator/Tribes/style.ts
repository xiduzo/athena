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
      // display: 'flex',
      // flexDirection: 'column',
      // flexGrow: 1,
      padding: theme.spacing(2, 0),
    },
    userGrid: {
      paddingBottom: theme.spacing(12),
    },
    pagerBox: {
      padding: theme.spacing(2),
    },
  }
})
