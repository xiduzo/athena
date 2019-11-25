import React, { FC, useState, useEffect, useMemo, Suspense } from 'react'
import { useStyles } from './style'

import { GetUsers, IUser } from 'src/lib/api'

import AddIcon from '@material-ui/icons/Add'
import {
  Avatar,
  Fab,
  Container,
  Grid,
  Card,
  CardHeader,
  CardActionArea,
  // CardContent,
} from '@material-ui/core'
import { Avataaar } from 'src/components/Avataaar'
import { Pager } from 'src/components/Pager'
import { onChangeData } from 'src/components/Pager/interface'

export const CoordinatorUsersRoute: FC = () => {
  const classes = useStyles()
  const [users, setUsers] = useState<any[]>([])
  const [displayedUsers, setDisplayedUsers] = useState<any[]>([])
  const [itemsPerPage, setItemsPerPage] = useState<number>(24)

  useEffect(() => {
    console.log(true)
    GetUsers()
      .then((response: IUser[]) => {
        setUsers(response)
        console.log(response)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

  useMemo(() => {
    // TODO: add page number in slice
    setDisplayedUsers(users.slice(0, itemsPerPage))
  }, [users, itemsPerPage])

  const handlePagerChange = (data: onChangeData) => {
    setItemsPerPage(data.pageSize)
    setDisplayedUsers(
      users.slice(data.currentPage * data.pageSize, (data.currentPage + 1) * data.pageSize)
    )
  }

  return (
    <section className={classes.main}>
      <Fab color='primary' aria-label='New agreement' className={classes.fab}>
        <AddIcon />
      </Fab>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Pager
              onChange={(data: onChangeData) => handlePagerChange(data)}
              numberOfItems={users.length}
              pageSize={itemsPerPage}
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          {displayedUsers.map((user: IUser) => (
            <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardActionArea>
                  <CardHeader
                    avatar={
                      <Suspense
                        fallback={<Avatar>{user.initials || user.first_name.charAt(0)}</Avatar>}
                      >
                        <Avataaar avatarStyle='Circle' />
                      </Suspense>
                    }
                    title={`${user.first_name} ${user.surname_prefix || ''} ${user.surname}`}
                    subheader={`${user.is_superuser && 'admin'} ${user.is_staff &&
                      'lecturer'} ${!user.is_staff && 'student'}`}
                  />
                  {/* <CardContent>general information</CardContent> */}
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  )
}
