import React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme, Typography } from '@material-ui/core'

interface IEmptyState {
  title: string
  subtitle?: string
  image?: any
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
    },
  }
})

export const EmptyState: FC<IEmptyState> = ({ title, subtitle, image }) => {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      {image && image}
      <Typography variant='h4' gutterBottom={true}>
        {title}
      </Typography>
      {subtitle && <Typography variant='body2'>{subtitle}</Typography>}
    </section>
  )
}
