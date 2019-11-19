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
      display: 'flex',
    },
    mainGrid: {
      padding: theme.spacing(2),
    },
  }
})
