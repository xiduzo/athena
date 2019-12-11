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
    zIndex: theme.zIndex.tooltip,
  },
  root: {
    display: 'flex',
    padding: theme.spacing(2, 0, 12, 0),
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
}))
