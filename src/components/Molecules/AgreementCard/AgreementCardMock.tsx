import React, { FC } from 'react'
import { Card, CardHeader, Avatar, CardContent, Typography, makeStyles, Theme } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import { AgreementCardClasses } from './AgreementCard'
import Brightness1Icon from '@material-ui/icons/Brightness1'

export const AgreementCardMock: FC = () => {
  const classes = AgreementCardClasses()
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar aria-label="agreement" className={classes.agreementAvatar}>
            <Brightness1Icon />
          </Avatar>
        }
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="caption" color="textSecondary" gutterBottom>
          <Skeleton variant="text" />
        </Typography>
        <Typography variant="subtitle1">
          <Skeleton variant="text" />
        </Typography>
      </CardContent>
    </Card>
  )
}
