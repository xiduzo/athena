import React, { FC, useEffect, useState } from 'react'
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
  TextField,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IAgreement } from 'src/lib/types/agreement'
import { AgreementIcon } from 'src/components/Atoms'

import { GetAgreements } from 'src/lib/api'

const init: Partial<IAgreement>[] = [
  {
    type: 3,
    text: 'is communicating clear',
  },
  {
    type: 0,
    text: 'gives feedback',
  },
  {
    type: 1,
    text: 'is asking questions',
  },
  {
    type: 2,
    text: 'argues clearly',
  },
]

export const AgreementsRoute: FC = () => {
  const classes = useStyles()
  const [agreements, setAgreements] = useState(init)

  useEffect(() => {
    // console.log(setAgreements, agreements)
    GetAgreements()
      .then((response: IAgreement[]) => setAgreements(response))
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

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
          {[...agreements].map((agreement: any, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label='recipe' className={classes.agreementAvatar}>
                      <AgreementIcon type={agreement.type}></AgreementIcon>
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
        <TextField
          id='filter by name'
          label='Name'
          // className={classes.textField}
          margin='normal'
          // onChange={filterHandler}
        />
      </Drawer>
    </section>
  )
}
