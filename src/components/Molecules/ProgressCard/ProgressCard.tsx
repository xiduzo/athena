import React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'

import { Theme, Card, LinearProgress } from '@material-ui/core'
import { red, orange, green } from '@material-ui/core/colors'
import clsx from 'clsx'

interface IProgressCard {
  progress: number
}

export const useStyles = makeStyles((theme: Theme) => ({
  danger: {
    background: red[500],
  },
  dangerBar: {
    background: red[200],
    '& > div': {
      background: red[800],
    },
  },
  warning: {
    background: orange[500],
  },
  warningBar: {
    background: orange[200],
    '& > div': {
      background: orange[800],
    },
  },
  success: {
    background: green[500],
  },
  successBar: {
    background: green[200],
    '& > div': {
      background: green[800],
    },
  },
}))

export const ProgressCard: FC<IProgressCard> = (props) => {
  const { progress, children } = props

  const classes = useStyles()

  return (
    <Card
      className={clsx({
        [classes.danger]: progress <= 25,
        [classes.warning]: progress <= 50 && progress > 25,
        [classes.success]: progress <= 100 && progress > 50,
      })}
    >
      {children}
      <LinearProgress
        variant="determinate"
        value={progress}
        className={clsx({
          [classes.dangerBar]: progress <= 25,
          [classes.warningBar]: progress <= 50 && progress > 25,
          [classes.successBar]: progress <= 100 && progress > 50,
        })}
      />
    </Card>
  )
}
