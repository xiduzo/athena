import React, { FC } from 'react'
import {
  Grid,
  Paper,
  CircularProgress,
  Typography,
  List,
  ListItem,
  Container,
  CardContent,
  Tooltip,
} from '@material-ui/core'
import { useStyles } from './style'
import { FeedbackPointsGraph, FeedbackSpiderGraph } from 'src/components/Atoms/graphs'
import { useWidth } from 'src/lib/hooks/useWidth'
import { ProgressCard } from 'src/components/Molecules/ProgressCard'

export const StudentDashboardRoute: FC = () => {
  const classes = useStyles()
  const width = useWidth()

  const timeTillNextFeedback = Math.random() * 100
  const timeTillEndOfProject = Math.random() * 100

  return (
    <Container maxWidth="lg">
      <Grid container spacing={width === 'xs' ? 2 : 4} className={classes.mainGrid}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h2">
            Team name
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            My feedback
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Tooltip title={`X days timeTillNextFeedback`}>
            <ProgressCard progress={timeTillNextFeedback}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  timeTillNextFeedback
                </Typography>
              </CardContent>
            </ProgressCard>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <CircularProgress variant="static" value={75} size={48} thickness={6} />
            <CircularProgress variant="static" value={75} size={48} thickness={6} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Tooltip title={`X days timeTillEndOfProject`}>
            <ProgressCard progress={timeTillEndOfProject}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  timeTillNextFeedback
                </Typography>
              </CardContent>
            </ProgressCard>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            My feedback
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <FeedbackPointsGraph />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeedbackSpiderGraph />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            My cards
          </Typography>
        </Grid>
        <List>
          {[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33, 44, 55, 66, 77, 88, 99 ].map((card: number) => (
            <ListItem key={card}>card {card}</ListItem>
          ))}
        </List>
      </Grid>
      student dashboard
    </Container>
  )
}
