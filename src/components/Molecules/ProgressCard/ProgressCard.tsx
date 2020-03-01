import React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'

import { Theme, Card, LinearProgress, Tooltip } from '@material-ui/core'
import { red, orange, green } from '@material-ui/core/colors'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => ({
  danger: {
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  dangerBar: {
    background: theme.palette.error.light,
    '& > div': {
      background: theme.palette.error.dark,
    },
  },
  warning: {
    background: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  },
  warningBar: {
    background: theme.palette.warning.light,
    '& > div': {
      background: theme.palette.warning.dark,
    },
  },
  success: {
    background: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
  successBar: {
    background: theme.palette.success.light,
    '& > div': {
      background: theme.palette.success.dark,
    },
  },
}))

interface IProgressCard {
  progress: number
  tooltip?: string
}

export const ProgressCard: FC<IProgressCard> = (props) => {
  const { progress, tooltip, children } = props

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
      <Tooltip title={tooltip ? tooltip : `${progress}%`}>
        <LinearProgress
          variant="determinate"
          value={progress}
          className={clsx({
            [classes.dangerBar]: progress <= 25,
            [classes.warningBar]: progress <= 50 && progress > 25,
            [classes.successBar]: progress <= 100 && progress > 50,
          })}
        />
      </Tooltip>
    </Card>
  )
}
