import { useQuery } from '@apollo/react-hooks'
import {
  CardContent,
  Container,
  Grid,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { Alert, Skeleton } from '@material-ui/lab'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useAuth } from 'src/common/providers'
import { IRootReducer } from 'src/common/redux'
import { FeedbackPointsGraph, FeedbackSpiderGraph, ProgressCard } from 'src/components'
import { FeedbackPointsGraphMock } from 'src/components/Atoms/graphs/FeedbackPointsGraphMock'
import { IUser } from 'src/lib/interfaces'
import { MEMBER_DASHBOARD_QUERY } from './query'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2, 3),
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const infoCards: IInfoCard[] = [
  {
    value: 3,
    max: 15,
    text: 'Cards due this week',
    inverse: true,
  },
  {
    value: 34.7,
    max: 120,
    text: 'Days to go',
    inverse: false,
  },
  {
    value: 1.4,
    max: 7,
    text: 'Days to give feedback',
    inverse: false,
  },
  {
    value: 10,
    max: 60,
    text: 'Feedback to give',
    inverse: true,
  },
]

interface IInfoCard {
  value: number
  max: number
  text: string
  inverse: boolean
}

interface IQueryData {
  User: IUser[]
}

interface IQueryParams {
  userId: string
  squadId: string
}

export const MemberDashboard: FC = () => {
  const classes = useStyles()

  const { userInfo } = useAuth()

  const selectedSquad = useSelector<IRootReducer, string>(
    (state: IRootReducer) => state.global.selectedSquad
  )

  const { data, loading, error } = useQuery<IQueryData, IQueryParams>(MEMBER_DASHBOARD_QUERY, {
    variables: {
      userId: userInfo ? userInfo.id : '',
      squadId: selectedSquad,
    },
  })

  return (
    <Container maxWidth='lg' className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h4' component='h2'>
            {loading ? (
              <Skeleton />
            ) : error ? (
              `Something went wrong`
            ) : !data?.User[0]?.squads.length ? (
              `No tribe found`
            ) : (
              data.User[0].squads[0].name
            )}
          </Typography>
        </Grid>
        {infoCards.map((item) => {
          const { text, value, max, inverse } = item
          const percentage = Math.round(Math.abs((inverse ? -100 : 0) + (value * 100) / max))
          return (
            <Grid item key={item.text} xs={12} sm={6} lg={3}>
              <ProgressCard progress={percentage <= 100 ? percentage : 100}>
                <CardContent className={classes.centered}>
                  <Tooltip title={`${value} of ${max}`}>
                    <Typography variant='h3' component='h2'>
                      {Math.round(value)}
                    </Typography>
                  </Tooltip>
                  <Typography variant='h6' component='h2'>
                    {text}
                  </Typography>
                </CardContent>
              </ProgressCard>
            </Grid>
          )
        })}
        <Grid item xs={12}>
          <Typography variant='h6' component='h2'>
            My feedback
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          {loading ? (
            <FeedbackPointsGraphMock />
          ) : error ? (
            <Alert variant='filled' severity='error'>
              {error.message}
            </Alert>
          ) : !data?.User[0]?.squads.length ? (
            <FeedbackPointsGraphMock />
          ) : (
            <FeedbackPointsGraph showAll={false} agreements={data.User[0].squads[0].agreements} />
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {loading ? (
            <div>loading</div>
          ) : error ? (
            <Alert variant='filled' severity='error'>
              {error.message}
            </Alert>
          ) : !data?.User[0]?.squads[0]?.agreements.length ? (
            <div>empty</div>
          ) : (
            <FeedbackSpiderGraph agreements={data.User[0].squads[0].agreements} />
          )}
        </Grid>
        {/* <Grid item xs={12}>
          <Typography variant='h6' component='h2'>
            Cards due [select day / week / month]
          </Typography>
        </Grid>
        <List>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33, 44, 55, 66, 77, 88, 99].map((card: number) => (
            <ListItem key={card}>card {card}</ListItem>
          ))}
        </List> */}
      </Grid>
    </Container>
  )
}
