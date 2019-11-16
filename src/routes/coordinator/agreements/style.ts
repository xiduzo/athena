import { makeStyles } from '@material-ui/styles'

import { Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}))
