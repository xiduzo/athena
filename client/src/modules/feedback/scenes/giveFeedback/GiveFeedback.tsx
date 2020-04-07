import { useMutation, useQuery } from '@apollo/react-hooks'
import { Box, Container, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import React, { FC, Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useWidth } from 'src/common/hooks'
import { useAuth } from 'src/common/providers'
import { IRootReducer } from 'src/common/redux'
import { IGiveFeedbackData, IGiveFeedbackDataVariables, USER_FEEDBACK } from 'src/common/services'
import { GIVE_FEEDBACK, IGiveFeedbackToUserVariables } from 'src/common/services/feedbackService'
import { IAgreement, IFeedback, IUser } from 'src/lib/interfaces'
import { v4 as uuid } from 'uuid'
import { FeedbackPanel } from './components/FeedbackPanel'
import { UserAverageRating } from './components/UserAverageRating'

interface IGiveFeedbackRoute {}

export const useStyles = makeStyles((theme: Theme) => ({
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    padding: theme.spacing(2, 3),
  },
}))

export const GiveFeedback: FC<IGiveFeedbackRoute> = () => {
  const classes = useStyles()
  const width = useWidth()
  const { t } = useTranslation()
  const { userInfo } = useAuth()

  const globalState = useSelector((state: IRootReducer) => state.global)

  const [currentWeek] = useState(7)
  const [selectedWeek, setSelectedWeek] = useState(currentWeek)

  const { data, error, loading, refetch } = useQuery<IGiveFeedbackData, IGiveFeedbackDataVariables>(
    USER_FEEDBACK,
    {
      variables: {
        userId: userInfo ? userInfo.id : '', // todo, add user info to global state instead of auth?
        squadId: globalState.selectedSquad,
      },
    }
  )

  const [GiveFeedbackToUser] = useMutation<any, IGiveFeedbackToUserVariables>(GIVE_FEEDBACK)

  // TODO move to utils, params userId and agreements
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

  // TODO move to utils layer?
  const giveFeedback = async (
    myFeedback: IFeedback | undefined,
    value: number | null,
    user: IUser,
    agreement: IAgreement
  ) => {
    if (!value) return
    // TODO fix bug
    // only first panel gives good agreement as paraments
    // console.log(myFeedback, value, user, agreement, userInfo.id)
    console.log(agreement)
    console.log({
      toUserId: user.id,
      fromUserId: userInfo.id,
      agreementId: agreement.id,
      feedbackId: myFeedback ? myFeedback.id : uuid(),
      rating: value,
      weekNum: currentWeek,
    })
    // await GiveFeedbackToUser({
    //   variables: {
    //     toUserId: user.id,
    //     fromUserId: userInfo.id,
    //     agreementId: agreement.id,
    //     feedbackId: myFeedback ? myFeedback.id : uuid(),
    //     rating: value,
    //     weekNum: currentWeek,
    //   },
    // })

    refetch()
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
              data.User[0].squads[0].members.map((user: IUser) => (
                <UserAverageRating user={user} agreements={data.User[0].squads[0].agreements} />
              ))}
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
                data.User[0].squads[0].agreements.map((agreement: IAgreement) => (
                  <Box key={agreement.id}>
                    {agreement.id}
                    <FeedbackPanel
                      agreement={agreement}
                      isCurrentWeek={selectedWeek === currentWeek}
                      selectedWeek={selectedWeek}
                      members={data.User[0].squads[0].members}
                    />
                  </Box>
                ))}
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
