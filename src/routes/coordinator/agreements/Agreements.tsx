import React, { FC } from 'react'
import { useStyles } from './style'

import {
  Container,
  Grid,
  Typography,
  Drawer,
  Fab,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Icon,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import GroupWorkIcon from '@material-ui/icons/GroupWork'
import WorkIcon from '@material-ui/icons/Work'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import DescriptionIcon from '@material-ui/icons/Description'

const agreements = [
  {
    icon: WorkIcon,
    text: 'is communicating clear',
  },
  {
    icon: GroupWorkIcon,
    text: 'gives feedback',
  },
  {
    icon: EmojiObjectsIcon,
    text: 'is asking questions',
  },
  {
    icon: DescriptionIcon,
    text: 'argues clearly',
  },
]

export const CoordinatorAgreementsRoute: FC = () => {
  const classes = useStyles()

  return (
    <section className={classes.main}>
      <Fab color='primary' aria-label='New agreement' className={classes.fab}>
        <AddIcon />
      </Fab>
      <Container maxWidth='lg'>
        <Grid container spacing={2} className={classes.mainGrid}>
          <Grid item xs={12}>
            <Typography component='h2' variant='h5'>
              Agreements
            </Typography>
          </Grid>
          {[
            ...agreements.reverse(),
            ...agreements.reverse(),
            ...agreements.reverse(),
            ...agreements.reverse(),
            ...agreements.reverse(),
          ].map((agreement: any, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label='recipe' className={classes.agreementAvatar}>
                      <Icon component={agreement.icon} />
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label='settings'>
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Typography className={classes.agreementTitle} color='textSecondary' gutterBottom>
                    The student
                  </Typography>
                  <Typography variant='h6'>{agreement.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Drawer
        variant='permanent'
        anchor='right'
        className={classes.drawer}
        classes={{
          paper: classes.drawer,
        }}
      >
        <div className={classes.toolbar}></div>
        <Typography component='h2' variant='h5'>
          Filter
        </Typography>
      </Drawer>
    </section>
  )
}
