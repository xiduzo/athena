import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => {
  return {
    appBar: {
      position: 'fixed',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create([ 'width', 'margin' ], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('sm')]: {
        top: 0,
      },
      [theme.breakpoints.down('xs')]: {
        bottom: 0,
      },
    },
    title: {
      flexGrow: 1,
    },
    icon: {
      marginRight: theme.spacing(2),
    },
  }
})
