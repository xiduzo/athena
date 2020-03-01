import { makeStyles } from '@material-ui/styles'

import { Theme } from '@material-ui/core'

const drawerWidth = '20vw'
export const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    padding: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    bottom: 0,
    right: drawerWidth,
    margin: theme.spacing(2),
    zIndex: theme.zIndex.mobileStepper,
  },
  main: {
    padding: theme.spacing(2, 3),
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
  fieldset: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
}))
