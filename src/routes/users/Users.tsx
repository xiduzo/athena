import React, { FC, useState, useEffect } from 'react'
import { useStyles } from './style'
import { GetUsers } from 'src/lib/api'

import AddIcon from '@material-ui/icons/Add'
import {
  Fab,
  Container,
  Grid,
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
} from '@material-ui/core'
import { Avataaar } from 'src/components/Avataaar'
import { IUser } from 'src/lib/types/user'

export const UsersRoute: FC = () => {
  const classes = useStyles()
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    GetUsers()
      .then((response: IUser[]) => {
        setUsers(response)
      })
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
        <Grid container spacing={2} className={classes.userGrid}>
          {users.map((user: IUser) => (
            <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardActionArea>
                  <CardHeader
                    avatar={<Avataaar avatarStyle='Circle' />}
                    title={`${user.first_name} ${user.surname_prefix || ''} ${user.surname}`}
                    subheader={`${user.is_superuser && 'admin'} ${user.is_staff &&
                      'lecturer'} ${!user.is_staff && 'student'}`}
                  />
                  <CardContent>general information</CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  )
}
