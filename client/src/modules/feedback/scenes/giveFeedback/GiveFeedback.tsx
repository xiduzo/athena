import { useQuery, useMutation } from '@apollo/react-hooks'
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
import gql from 'graphql-tag'
import React, { FC, Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useWidth } from 'src/common/hooks'
import { useAuth } from 'src/common/providers'
import { IRootReducer } from 'src/common/redux'
import { getTranslation } from 'src/common/utils'
import { Avataaar } from 'src/components'
import { IAgreement, ISquad, IUser, IFeedback } from 'src/lib/interfaces'
import { GIVE_FEEDBACK, IGiveFeedbackToUserVariables } from 'src/common/services/feedbackService'
import { v4 as uuid } from 'uuid'

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

interface IGiveFeedbackData {
  User: IUser[]
}

interface IGiveFeedbackDataVariables {
  userId: string
  squadId: string
  currentWeek: number
}

export const GiveFeedback: FC<IGiveFeedbackRoute> = () => {
  const classes = useStyles()
  const width = useWidth()
  const { t } = useTranslation()
  const { userInfo } = useAuth()

  const globalState = useSelector((state: IRootReducer) => state.global)

  const [currentWeek] = useState(6)
  const [selectedWeek, setSelectedWeek] = useState(currentWeek)

  const { data, error, loading, refetch } = useQuery<IGiveFeedbackData, IGiveFeedbackDataVariables>(
    gql`
      query UserFeedback($userId: String!, $squadId: String!, $currentWeek: Int!) {
        User(filter: { id: $userId }) {
          id
          squads(filter: { id: $squadId }) {
            name
            members {
              id
              displayName
              avatarStyle
            }
            agreements {
              id
              points
              translations {
                language
                text
              }
              feedback(filter: { from: { id: $userId }, weekNum: $currentWeek }) {
                id
                weekNum
                from {
                  id
                }
                to {
                  id
                }
                agreement {
                  id
                }
                rating
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        userId: userInfo ? userInfo.id : '', // todo, add user info to global state instead of auth?
        squadId: globalState.selectedSquad,
        currentWeek: currentWeek,
      },
    }
  )

  const [GiveFeedbackToUser] = useMutation<any, IGiveFeedbackToUserVariables>(GIVE_FEEDBACK)

  const getAveragePoints = (userId: string) => {
    const agreements: IAgreement[] = data ? data.User[0].squads[0].agreements : []
    let totalPoints = 0

    agreements.forEach((agreement) => {
      agreement.feedback
        .filter((feedback) => feedback.to.id === userId)
        .forEach((feedback) => {
          totalPoints += feedback.rating
        })
    })

    return totalPoints / agreements.length
  }

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

  const getFeedbackItemsToGo = (agreement: IAgreement) => {
    const usersInSquad = data ? data.User[0].squads[0].members.length - 1 : 0
    const amountToGo = usersInSquad - agreement.feedback.length
    return (
      <Tooltip title={`amount to go: ${amountToGo}`}>
        <Fragment>
          {amountToGo <= Math.round(usersInSquad * 0.5) && <ErrorIcon className={classes.error} />}
          {amountToGo > Math.round(usersInSquad * 0.5) && amountToGo !== 0 && (
            <WarningIcon className={classes.warning} />
          )}
          {amountToGo === 0 && <CheckCircleIcon className={classes.success} />}
        </Fragment>
      </Tooltip>
    )
  }

  const giveFeedback = async (
    myFeedback: IFeedback | undefined,
    value: number | null,
    user: IUser,
    agreement: IAgreement
  ) => {
    if (!value) return
    console.log(myFeedback, value, user, agreement, userInfo.id)
    await GiveFeedbackToUser({
      variables: {
        toUserId: user.id,
        fromUserId: userInfo.id,
        agreementId: agreement.id,
        feedbackId: myFeedback ? myFeedback.id : uuid(),
        rating: value,
        weekNum: currentWeek,
      },
    })

    refetch()
  }

  const FeedbackPanel = (agreement: IAgreement) => {
    if (!data) return <div>loading</div>

    const squad: ISquad = data.User[0].squads[0]
    const membersToGiveFeedbackTo = squad.members.filter(
      (user: IUser) => userInfo && user.id !== userInfo.id
    )
    return (
      <ExpansionPanel
        disabled={selectedWeek > currentWeek}
        TransitionProps={{ unmountOnExit: true }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container alignItems='center' justify='space-between'>
            <Typography variant='h6'>{getTranslation(agreement.translations)}</Typography>
            {getFeedbackItemsToGo(agreement)}
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={2}>
            {membersToGiveFeedbackTo.map((user: IUser) => {
              const myFeedback = agreement.feedback.find((feedback) => {
                console.log(feedback)
                return (
                  feedback.to.id === user.id &&
                  feedback.weekNum === selectedWeek &&
                  feedback.agreement.id === agreement.id
                )
              })

              return (
                <Grid
                  key={`${agreement.id}${user.id}`}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className={classes.center}
                >
                  <Avataaar
                    user={user}
                    avatar={{
                      style: { width: '75px', height: '75px' },
                    }}
                  />
                  <Typography variant='subtitle1'>{user.displayName}</Typography>

                  <Rating
                    disabled={selectedWeek !== currentWeek}
                    max={4}
                    name='pristine'
                    size='large'
                    value={myFeedback ? myFeedback.rating : null}
                    precision={0.5}
                    onChange={(_: React.ChangeEvent<{}>, value: number | null) =>
                      giveFeedback(myFeedback, value, user, agreement)
                    }
                    emptyIcon={
                      selectedWeek !== currentWeek ? (
                        <StarIcon fontSize={`inherit`} />
                      ) : (
                        <StarBorderIcon fontSize={`inherit`} />
                      )
                    }
                  />
                </Grid>
              )
            })}
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
        {loading ? (
          <div>loading</div>
        ) : error ? (
          <div>error</div>
        ) : !data || !data.User.length ? (
          <div>empty</div>
        ) : (
          <Fragment>
            {data.User[0] &&
              data.User[0].squads[0] &&
              data.User[0].squads[0].members.map((user: IUser) => {
                const averagePoints = getAveragePoints(user.id)
                return (
                  <Tooltip key={`${user.id}`} title={averagePoints}>
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
              })}
            <Grid
              item
              container
              xs={12}
              direction={['xs', 'sm'].indexOf(width) > -1 ? 'column' : 'row'}
              justify={['xs', 'sm'].indexOf(width) > -1 ? 'center' : 'space-between'}
              alignItems={['xs', 'sm'].indexOf(width) > -1 ? 'flex-start' : 'center'}
            >
              <Typography variant='h6'>{t('agreements')}</Typography>
              <Box width={['xs', 'sm'].indexOf(width) > -1 ? '100%' : 'auto'}>
                <Grid
                  item
                  container
                  justify={['md', 'lg', 'xl'].indexOf(width) > -1 ? 'flex-end' : 'center'}
                >
                  {pagination()}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {data.User[0] &&
                data.User[0].squads[0] &&
                data.User[0].squads[0].agreements.map((agreement: IAgreement) =>
                  selectedWeek > currentWeek ? (
                    <Tooltip key={agreement.id} title={`Patients you must have, my young padawan`}>
                      {FeedbackPanel(agreement)}
                    </Tooltip>
                  ) : (
                    <Box key={agreement.id}>{FeedbackPanel(agreement)}</Box>
                  )
                )}
            </Grid>
            <Grid item container xs={12} justify={`center`}>
              {pagination()}
            </Grid>
          </Fragment>
        )}
      </Grid>
    </Container>
  )
}
