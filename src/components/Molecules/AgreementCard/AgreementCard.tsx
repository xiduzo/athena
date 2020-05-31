import { Avatar, CardContent, CardHeader, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { getTranslation } from 'src/common/utils'
import { AgreementIcon, ClickableCard, IClickableCard } from 'src/components'
import { IAgreement } from 'src/lib/interfaces'

interface IAgreementCard extends IClickableCard {
  agreement: IAgreement
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
    flexGrow: 1,
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
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    '&:last-child': {
      padding: theme.spacing(1),
    },
  },
}))

export const AgreementCard: FC<IAgreementCard> = ({ agreement, onLeftClick, onRightClickItems }) => {
  const classes = AgreementCardClasses()

  return (
    <ClickableCard
      onLeftClick={onLeftClick}
      onRightClickItems={onRightClickItems}
      cardContent={
        <section className={classes.details}>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar aria-label='recipe' className={classes.agreementAvatar}>
                <AgreementIcon type={agreement.type} />
              </Avatar>
            }
          />
          <CardContent className={classes.cardContent}>
            <Typography variant='caption' color='textSecondary' gutterBottom>
              The student
            </Typography>
            <Typography variant='subtitle1'>{getTranslation(agreement.translations)}</Typography>
          </CardContent>
        </section>
      }
    />
  )
}
