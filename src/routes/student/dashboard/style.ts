import { makeStyles } from '@material-ui/styles'

import { Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  mainGrid: {
    padding: theme.spacing(2),
  },
}))
