import { makeStyles } from '@material-ui/styles'

import { Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  main: {
    padding: theme.spacing(2, 3),
  },
}))
