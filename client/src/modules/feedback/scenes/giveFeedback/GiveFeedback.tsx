import React, { FC, useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles,
  Theme,
  Tooltip,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { Avataaar } from 'src/components/Atoms/Avataaar'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import ErrorIcon from '@material-ui/icons/Error'
import { green, orange, red } from '@material-ui/core/colors'
import { useTranslation } from 'react-i18next'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { Auth } from 'aws-amplify'

interface IGiveFeedbackRoute {}

export const useStyles = makeStyles((theme: Theme) => ({
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  success: {
    color: green[500],
  },
  warning: {
    color: orange[500],
  },
  error: {
    color: red[500],
  },
  root: {
    padding: theme.spacing(2, 3),
  },
}))

export const GiveFeedbackRoute: FC<IGiveFeedbackRoute> = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const [ self, setSelf ] = useState<{ id: string } | undefined>(undefined)

  useEffect(
    () => {
      if (self) return
      const getSelf = async () => {
        const user = await Auth.currentUserInfo()
        setSelf(user)
      }

      getSelf()
    },
    [ self ]
  )

  console.log(self)

  return (
    <Container maxWidth='lg' className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h4'>{t(`feedback`)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Average scores</Typography>
        </Grid>
        {[ 1, 2, 3, 4 ].map((user) => (
          <Tooltip title={`rating:`}>
            <Grid key={`${user}`} item xs={12} sm={6} md={4} lg={3} className={classes.center}>
              <Avataaar avatarStyle='Circle' style={{ width: '75px', height: '75px' }} />
              <Typography variant='subtitle1'>user {user}</Typography>
              <Rating
                max={4}
                name='pristine'
                size='large'
                value={Math.random() * 4}
                readOnly
                precision={0.1}
                emptyIcon={<StarBorderIcon fontSize='inherit' />}
              />
            </Grid>
          </Tooltip>
        ))}
        <Grid item xs={12}>
          <Typography variant='h6'>{t('agreements')}</Typography>
        </Grid>
        <Grid item xs={12}>
          {[ 1, 2, 3, 4, 5, 6 ].map((agreement) => (
            <ExpansionPanel key={agreement}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container alignItems='center' justify='space-between'>
                  <Typography variant='h6'>agreement {agreement}</Typography>
                  {Math.random() > 0.5 ? (
                    <CheckCircleIcon className={classes.success} />
                  ) : Math.random() > 0.5 ? (
                    <WarningIcon className={classes.warning} />
                  ) : (
                    <ErrorIcon className={classes.error} />
                  )}
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={2}>
                  {[ 1, 2, 3, 4 ].map((user) => (
                    <Grid key={`${agreement}${user}`} item xs={12} sm={6} md={4} lg={3} className={classes.center}>
                      <Avataaar avatarStyle='Circle' style={{ width: '75px', height: '75px' }} />
                      <Typography variant='subtitle1'>user {user}</Typography>

                      <Rating max={4} name='pristine' size='large' value={null} precision={0.5} />
                    </Grid>
                  ))}
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}
