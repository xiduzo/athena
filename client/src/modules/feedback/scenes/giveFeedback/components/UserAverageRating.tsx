import React, { FC } from 'react'
import { IUser, IAgreement } from 'src/lib/interfaces'
import { makeStyles, Theme, Tooltip, Grid, Typography } from '@material-ui/core'
import { Avataaar } from 'src/components'
import { Rating } from '@material-ui/lab'

const useStyles = makeStyles((_: Theme) => ({
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

interface IUserAverageRating {
  user: IUser
  agreements: IAgreement[]
  currentWeek: number
}

export const UserAverageRating: FC<IUserAverageRating> = ({ user, agreements, currentWeek }) => {
  const classes = useStyles()

  const getAveragePoints = (): number => {
    let totalPoints = 0

    agreements.forEach((agreement) => {
      agreement.feedback
        .filter((feedback) => feedback.to.id === user.id)
        .forEach((feedback) => {
          totalPoints += feedback.rating
        })
    })

    return totalPoints / (agreements.length * currentWeek)
  }

  const averagePoints: number = Math.round((getAveragePoints() + Number.EPSILON) * 100) / 100

  return (
    <Tooltip key={user.id} title={`Average: ${averagePoints}`}>
      <Grid item xs={12} sm={6} md={4} lg={3} className={classes.center}>
        <Avataaar
          user={user}
          avatar={{
            style: { width: '75px', height: '75px' },
          }}
        />
        <Typography variant='subtitle1'>{user.displayName}</Typography>
        <Rating max={4} size='large' value={averagePoints} readOnly precision={0.1} />
      </Grid>
    </Tooltip>
  )
}
