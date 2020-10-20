import React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Box, Button, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
    },
    image: {
      marginBottom: theme.spacing(3),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    subtitle: {
      marginBottom: theme.spacing(2),
    },
  }
})

interface IEmptyState {
  title: string
  subtitle?: string
  image?: any
  action?: {
    title: string
    event: () => void
    icon: JSX.Element
  }
}

export const EmptyState: FC<IEmptyState> = ({ title, subtitle, image, action }) => {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      {image && <Box className={classes.image}>{image}</Box>}
      <Typography variant='h4' className={classes.title}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant='body2' className={classes.subtitle}>
          {subtitle}
        </Typography>
      )}
      {action && (
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={action.event}
          startIcon={action.icon}
        >
          {action.title}
        </Button>
      )}
    </section>
  )
}
