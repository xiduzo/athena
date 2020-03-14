import { makeStyles } from '@material-ui/styles'

import { Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => {
  return {
    pager: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    button: {
      color: theme.palette.text.primary,
      listStyle: 'none',
      minWidth: theme.spacing(8),
      // transition:
      // 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      fontWeight: 500,
      lineHeight: 1.75,
      borderRadius: theme.spacing(0.5),
      boxSizing: 'border-box',
      textTransform: 'uppercase',

      '&:hover': {
        textDecoration: 'none',
        background: theme.palette.grey[300],
        cursor: 'pointer',
      },

      '& a': {
        padding: theme.spacing(0.75, 2),
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        '&:focus': {
          outline: 'none',
        },
      },
    },
    active: {
      boxShadow:
        '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
      '&:hover': {
        background: theme.palette.primary.dark,
        boxShadow:
          '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      },
    },
    disabled: {
      '& > a > svg': {
        color: theme.palette.grey[500],
      },
      '&:hover': {
        cursor: 'not-allowed',
        background: theme.palette.grey[200],
      },
    },
    link: {
      lineHeight: 1.75,
    },
    selectDiv: {
      display: 'flex',
      alignItems: 'center',
    },
    formControl: {
      margin: theme.spacing(0, 1),
    },
  }
})
