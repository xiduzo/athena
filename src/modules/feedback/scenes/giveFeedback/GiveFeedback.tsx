import React, { FC, Fragment } from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles,
  Theme,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { Avataaar } from 'src/components/Atoms/Avataaar'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import ErrorIcon from '@material-ui/icons/Error'
import { green, orange, red } from '@material-ui/core/colors'
import clsx from 'clsx'

interface IGiveFeedbackRoute {}

export const useStyles = makeStyles((_: Theme) => ({
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
}))

export const GiveFeedbackRoute: FC<IGiveFeedbackRoute> = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4">Feedback</Typography>
        </Grid>
        <Grid item xs={12}>
          {[ 1, 2, 3, 4, 5, 6 ].map((item) => (
            <Fragment>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Grid container alignItems="center" justify="space-between">
                    <Typography variant="h6">agreement {item}</Typography>
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
                      <Grid item xs={12} sm={6} md={4} lg={3} className={classes.center}>
                        <Avataaar avatarStyle="Circle" style={{ width: '75px', height: '75px' }} />
                        <Typography variant="subtitle1">user {user}</Typography>

                        <Rating max={4} name="pristine" size="large" value={null} />
                      </Grid>
                    ))}
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Fragment>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}
