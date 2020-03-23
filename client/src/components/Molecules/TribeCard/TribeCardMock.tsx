import React, { FC } from 'react'
import { Card, CardHeader, makeStyles, Theme, Avatar } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles((theme: Theme) => {
  return {
    avatar: {
      background: theme.palette.grey[100],
    },
  }
})

export const TribeCardMock: FC = () => {
  const classes = useStyles()
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <Skeleton variant='circle' />
          </Avatar>
        }
        title={<Skeleton variant='text' />}
      />
    </Card>
  )
}
