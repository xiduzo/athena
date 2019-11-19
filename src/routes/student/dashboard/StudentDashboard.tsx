import React, { FC } from 'react'
import { GetTribeById } from 'src/lib/api'
import {
  Button,
  Grid,
  Paper,
  CircularProgress,
  Typography,
  List,
  ListItem,
  Container,
} from '@material-ui/core'
import { useStyles } from './style'

export const StudentDashboardRoute: FC = () => {
  const classes = useStyles()

  const getTribeById = () => {
    GetTribeById().then(tribe => {
      console.log(tribe)
    })
  }

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={4} className={classes.mainGrid}>
        <Grid item xs={12}>
          <Typography variant='h5' component='h2'>
            Team name
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <CircularProgress variant='static' value={75} size={48} thickness={6} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <CircularProgress variant='static' value={75} size={48} thickness={6} />
            <CircularProgress variant='static' value={75} size={48} thickness={6} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <CircularProgress variant='static' value={75} size={48} thickness={6} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' component='h2'>
            My feedback
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper>feedback over time</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>feedback per category</Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' component='h2'>
            My cards
          </Typography>
        </Grid>
        <List>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33, 44, 55, 66, 77, 88, 99].map((card: number) => (
            <ListItem key={card}>card {card}</ListItem>
          ))}
        </List>
      </Grid>
      student dashboard
      <Button onClick={getTribeById}>get tribe</Button>
    </Container>
  )
}
