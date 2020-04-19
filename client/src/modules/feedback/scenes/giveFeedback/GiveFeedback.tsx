import { useMutation, useQuery } from '@apollo/react-hooks'
import { Box, Container, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import React, { FC, Fragment, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useWidth, useHotkeys } from 'src/common/hooks'
import { useAuth } from 'src/common/providers'
import { IRootReducer, IGlobalState } from 'src/common/redux'
import { IGiveFeedbackData, IGiveFeedbackDataVariables, USER_FEEDBACK } from 'src/common/services'
import { GIVE_FEEDBACK, IGiveFeedbackToUserVariables } from 'src/common/services/feedbackService'
import { IAgreement, IFeedback, IUser } from 'src/lib/interfaces'
import { v4 as uuid } from 'uuid'
import { FeedbackPanel } from './components/FeedbackPanel'
import { UserAverageRating } from './components/UserAverageRating'
import { snackbarWrapper, getTranslation } from 'src/common/utils'
import { Key } from 'src/lib/enums'

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

  const globalState = useSelector<IRootReducer, IGlobalState>((state: IRootReducer) => state.global)

  const [currentWeek] = useState<number>(8) // TODO: use tribe current week
  const [selectedWeek, setSelectedWeek] = useState<number>(currentWeek)

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

  const nextWeek = useHotkeys(Key.N)
  const previousWeek = useHotkeys(Key.P)
  const firstWeek = useHotkeys(Key.Home)
  const lastWeek = useHotkeys(Key.End)

  const handleWeekChange = (_: any, value: number): void => {
    if (!value) return

    setSelectedWeek(value)
  }

  const pagination = (): JSX.Element => (
    <Pagination
      onChange={handleWeekChange}
      color={'primary'}
      count={10}
      siblingCount={width === 'xs' ? 0 : 1}
      boundaryCount={1}
      defaultPage={currentWeek}
      page={selectedWeek}
      showFirstButton={width !== 'xs'}
      showLastButton={width !== 'xs'}
    />
  )

  const giveFeedback = async (
    myFeedback: IFeedback | undefined,
    value: number | null,
    user: IUser,
    agreement: IAgreement
  ): Promise<void> => {
    if (!value) return

    await GiveFeedbackToUser({
      variables: {
        toUserId: user.id,
        fromUserId: userInfo.id,
        agreementId: agreement.id,
        feedbackId: myFeedback ? myFeedback.id : uuid(),
        rating: value,
        weekNum: selectedWeek,
      },
    })

    snackbarWrapper.success(`Gave feedback to ${user.displayName}`)

    refetch()
  }

  useEffect(() => {
    if (!nextWeek) return
    if (selectedWeek === 10) return // TODO: check for tribes max week
    if (loading || error) return

    setSelectedWeek(selectedWeek + 1)
  }, [nextWeek])

  useEffect(() => {
    if (!previousWeek) return
    if (selectedWeek === 1) return
    if (loading || error) return

    setSelectedWeek(selectedWeek - 1)
  }, [previousWeek])

  useEffect(() => {
    if (!firstWeek) return
    if (loading || error) return

    setSelectedWeek(1)
  }, [firstWeek])

  useEffect(() => {
    if (!lastWeek) return
    if (loading || error) return

    setSelectedWeek(10) // TODO: use tribes last week
  }, [lastWeek])

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
              data.User[0].squads[0].members
                .filter((u) => u.id !== userInfo.id)
                .map((user: IUser) => (
                  <UserAverageRating
                    key={user.id}
                    user={user}
                    currentWeek={currentWeek}
                    agreements={data.User[0].squads[0].agreements}
                  />
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
                  <FeedbackPanel
                    key={agreement.id}
                    agreement={agreement}
                    isCurrentWeek={selectedWeek === currentWeek}
                    selectedWeek={selectedWeek}
                    members={data.User[0].squads[0].members.filter((m) => m.id !== userInfo.id)}
                    callback={giveFeedback}
                  />
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
