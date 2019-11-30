import React, { FC, useState, useEffect } from 'react'
import { useStyles } from './style'
import { GetUsers } from 'src/lib/api'

import AddIcon from '@material-ui/icons/Add'
import { Fab, Container, Grid } from '@material-ui/core'
import { IUser } from 'src/lib/types/user'
import { UserCard } from 'src/components/Molecules/UserCard'
import { useHistory, useLocation } from 'react-router-dom'

export const UsersRoute: FC = () => {
  const classes = useStyles()
  const [users, setUsers] = useState<any[]>([])

  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    GetUsers()
      .then((response: IUser[]) => {
        setUsers(response)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

  const navigateToUser = (id: string) => {
    history.push(`${location.pathname}/${id}`)
  }

  return (
    <section className={classes.main}>
      <Fab color='primary' aria-label='New agreement' className={classes.fab}>
        <AddIcon />
      </Fab>
      <Container maxWidth='lg'>
        <Grid container spacing={2} className={classes.userGrid}>
          {users.map((user: IUser) => (
            <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
              <UserCard user={user} onClick={() => navigateToUser(user.id)} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  )
}
