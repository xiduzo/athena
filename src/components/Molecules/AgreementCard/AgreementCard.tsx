import React, { FC } from 'react'
import { IAgreement } from 'src/lib/types/agreement'
import { Card, CardActionArea, CardHeader, Avatar, CardContent, Typography, makeStyles, Theme } from '@material-ui/core'
import { AgreementIcon } from 'src/components/Atoms'

interface IAgreementCard {
  agreement: IAgreement
  onClick?: () => void
}

export const AgreementCardClasses = makeStyles((theme: Theme) => ({
  agreementAvatar: {
    background: 'none',
    '& svg': {
      fill: theme.palette.secondary.contrastText,
    },
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardHeader: {
    padding: theme.spacing(3.5, 1),
    background: theme.palette.secondary.main,
    '& > *': {
      margin: '0',
    },
  },
  cardContent: {
    textAlign: 'center',
    padding: theme.spacing(1),
    flexGrow: 1,
  },
}))

export const AgreementCard: FC<IAgreementCard> = ({ agreement, onClick }) => {
  const classes = AgreementCardClasses()

  const onClickHandler = () => {
    onClick && onClick()
  }
  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.details} onClick={onClickHandler} disabled={onClick ? false : true}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="recipe" className={classes.agreementAvatar}>
              <AgreementIcon type={agreement.type} />
            </Avatar>
          }
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="caption" color="textSecondary" gutterBottom>
            The student
          </Typography>
          <Typography variant="subtitle1">{agreement.text}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
