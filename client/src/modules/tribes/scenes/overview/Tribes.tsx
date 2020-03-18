import { useQuery } from '@apollo/react-hooks'
import { Container, Fab, Grid, Typography, makeStyles, Theme } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { GET_TRIBES } from 'src/common/services/tribeService'
import { Illustration, Illustrations } from 'src/components/Atoms/Illustration/Illustration'
import { EmptyState } from 'src/components/Molecules/EmptyState/EmptyState'
import { TribeCard, TribeCardMock } from 'src/components/Molecules/TribeCard'
import { ITribe } from 'src/lib/types/tribe'
import { useTranslation } from 'react-i18next'

export const useStyles = makeStyles((theme: Theme) => {
  return {
    fab: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      margin: theme.spacing(2),
    },
    main: {
      padding: theme.spacing(2, 3),
    },
  }
})

export const TribesRoute: FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const { loading, error, data } = useQuery(GET_TRIBES)

  const location = useLocation()
  const history = useHistory()

  const navigateToTribe = (id: string) => history.push(`${location.pathname}/${id}`)

  return (
    <Container maxWidth='lg' className={classes.main}>
      <Fab color='primary' aria-label='New tribe' className={classes.fab}>
        <AddIcon />
      </Fab>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h4'>{t('tribes')}</Typography>
        </Grid>
        {loading ? (
          Array.from({ length: 12 }).map((_, index: number) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <TribeCardMock />
            </Grid>
          ))
        ) : error ? (
          <div>{error.message}</div>
        ) : !data.Tribe.length ? (
          <Grid item={true} xs={12}>
            <EmptyState title={t('tribesNotfound')} image={<Illustration type={Illustrations.empty} />} />
          </Grid>
        ) : (
          data.Tribe.map((tribe: ITribe) => (
            <Grid key={tribe.id} item xs={12} sm={6} md={4} lg={3}>
              <TribeCard tribe={tribe} onClick={() => navigateToTribe(tribe.id)} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  )
}
