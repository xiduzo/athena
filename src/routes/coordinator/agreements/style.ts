import { makeStyles } from '@material-ui/styles'

import { Theme } from '@material-ui/core'

const drawerWidth = '20vw'
export const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    padding: theme.spacing(2),
  },
  fab: {
    position: 'absolute',
    bottom: 0,
    right: drawerWidth,
    margin: theme.spacing(2),
  },
  main: {
    display: 'flex',
  },
  mainGrid: {
    padding: theme.spacing(2),
  },
  toolbar: {
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}))
