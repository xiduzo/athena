import React, { FC } from 'react'
import { Card, CardHeader, CardContent, makeStyles, Theme, Avatar } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

export const useStyles = makeStyles((theme: Theme) => {
  return {
    avatar: {
      background: theme.palette.grey[100],
    },
  }
})

export const UserCardMock: FC = () => {
  const classes = useStyles()

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <Skeleton variant="circle" />
          </Avatar>
        }
        title={<Skeleton variant="text" />}
        subheader={<Skeleton variant="text" />}
      />
      <CardContent>
        <Skeleton variant="text" />
      </CardContent>
    </Card>
  )
}
