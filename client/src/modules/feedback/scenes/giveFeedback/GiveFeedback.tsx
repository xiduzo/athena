import {
  Box,
  Container,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import WarningIcon from '@material-ui/icons/Warning'
import { Pagination, Rating } from '@material-ui/lab'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWidth } from 'src/common/hooks'
import { useAuth } from 'src/common/providers'
import { Avataaar } from 'src/components'

interface IGiveFeedbackRoute {}

export const useStyles = makeStyles((theme: Theme) => ({
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  success: {
    color: theme.palette.success.main,
  },
  warning: {
    color: theme.palette.warning.main,
  },
  error: {
    color: theme.palette.error.main,
  },
  root: {
    padding: theme.spacing(2, 3),
  },
}))

export const GiveFeedbackRoute: FC<IGiveFeedbackRoute> = () => {
  const classes = useStyles()
  const width = useWidth()
  const { t } = useTranslation()
  const { userInfo } = useAuth()

  const [ currentWeek ] = useState(6)
  const [ selectedWeek, setSelectedWeek ] = useState(currentWeek)

  const handleWeekChange = (_: any, value: number) => {
    if (!value) return

    setSelectedWeek(value)
  }

  const pagination = () => {
    return (
      <Pagination
        onChange={handleWeekChange}
        color={'primary'}
        count={10}
        siblingCount={0}
        boundaryCount={1}
        defaultPage={currentWeek}
        page={selectedWeek}
        showFirstButton={width !== 'xs'}
        showLastButton={width !== 'xs'}
      />
    )
  }

  const FeedbackPanel = (agreement: any) => {
    return (
      <ExpansionPanel disabled={selectedWeek > currentWeek} TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container alignItems='center' justify='space-between'>
            <Typography variant='h6'>agreement {agreement}</Typography>
            <Tooltip title={'X to go'}>
              {Math.random() > 0.5 ? (
                <CheckCircleIcon className={classes.success} />
              ) : Math.random() > 0.5 ? (
                <WarningIcon className={classes.warning} />
              ) : (
                <ErrorIcon className={classes.error} />
              )}
            </Tooltip>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={2}>
            {[ 'eu-west-1:3c05b54c-250f-417b-825b-716a2352ace3', 2, 3, 4 ]
              .filter((user) => userInfo && user !== userInfo.id)
              .map((user) => (
                <Grid key={`${agreement}${user}`} item xs={12} sm={6} md={4} lg={3} className={classes.center}>
                  <Avataaar style={{ width: '75px', height: '75px' }} />
                  <Typography variant='subtitle1'>user {user}</Typography>

                  <Rating
                    disabled={selectedWeek !== currentWeek}
                    max={4}
                    name='pristine'
                    size='large'
                    value={null}
                    precision={0.5}
                    emptyIcon={
                      selectedWeek !== currentWeek ? (
                        <StarIcon fontSize={`inherit`} />
                      ) : (
                        <StarBorderIcon fontSize={`inherit`} />
                      )
                    }
                  />
                </Grid>
              ))}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }

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
          <Tooltip key={`${user}`} title={`rating:`}>
            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.center}>
              <Avataaar style={{ width: '75px', height: '75px' }} />
              <Typography variant='subtitle1'>user {user}</Typography>
              <Rating max={4} size='large' value={Math.random() * 4} readOnly precision={0.1} />
            </Grid>
          </Tooltip>
        ))}
        <Grid
          item
          container
          xs={12}
          direction={[ 'xs', 'sm' ].indexOf(width) > -1 ? 'column' : 'row'}
          justify={[ 'xs', 'sm' ].indexOf(width) > -1 ? 'center' : 'space-between'}
          alignItems={[ 'xs', 'sm' ].indexOf(width) > -1 ? 'flex-start' : 'center'}
        >
          <Typography variant='h6'>{t('agreements')}</Typography>
          <Box width={[ 'xs', 'sm' ].indexOf(width) > -1 ? '100%' : 'auto'}>
            <Grid item container justify={[ 'md', 'lg', 'xl' ].indexOf(width) > -1 ? 'flex-end' : 'center'}>
              {pagination()}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {[ 1, 2, 3, 4, 5, 6 ].map(
            (agreement) =>
              selectedWeek > currentWeek ? (
                <Tooltip key={agreement} title={`Patients you must have, my young padawan`}>
                  {FeedbackPanel(agreement)}
                </Tooltip>
              ) : (
                <Box key={agreement}>{FeedbackPanel(agreement)}</Box>
              )
          )}
        </Grid>
        <Grid item container xs={12} justify={`center`}>
          {pagination()}
        </Grid>
      </Grid>
    </Container>
  )
}
