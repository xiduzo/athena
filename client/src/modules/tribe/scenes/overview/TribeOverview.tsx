import { useQuery } from '@apollo/react-hooks'
import { Container, Fab, Grid, makeStyles, Theme, Typography, Zoom } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import gql from 'graphql-tag'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { and, useHotkeys } from 'src/common/hooks'
import { IRootReducer } from 'src/common/redux'
import { EmptyState, Illustration, TribeCard, TribeCardMock, Show } from 'src/components'
import { Key, IllustrationType, UserRole } from 'src/lib/enums'
import { ITribe } from 'src/lib/interfaces'
import { NewTribeModal } from './components'

export const useStyles = makeStyles((theme: Theme) => {
  return {
    fab: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      margin: theme.spacing(2),
    },
    root: {
      padding: theme.spacing(2, 3),
    },
  }
})

export const TribeOverview: FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const [ modalOpen, setModalOpen ] = useState(false)

  const hotkeysEnabled = useSelector((state: IRootReducer) => state.global.hotkeysEnabled)
  const newTribeHotkey = and([ useHotkeys(Key.Alt), useHotkeys(Key.N) ])

  const { loading, error, data, refetch } = useQuery(gql`
    query {
      Tribe {
        id
        name
      }
    }
  `)

  const location = useLocation()
  const history = useHistory()

  const navigateToTribe = (id: string) => history.push(`${location.pathname}/${id}`)

  const handleClose = () => {
    refetch()
    setModalOpen(!modalOpen)
  }

  useEffect(
    () => {
      if (!hotkeysEnabled) return
      if (!newTribeHotkey) return

      setModalOpen(true)
    },
    [ newTribeHotkey, hotkeysEnabled ]
  )

  return (
    <Container maxWidth='lg' className={classes.root}>
      <Show forGroups={[ UserRole.Admin ]}>
        <Zoom in={!loading && !error}>
          <Fab
            color='primary'
            aria-label={t('tribeNew')}
            className={classes.fab}
            onClick={() => setModalOpen(!modalOpen)}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </Show>
      <NewTribeModal isOpen={modalOpen} onClose={handleClose} />
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
          <Grid item xs={12}>
            <EmptyState title={t('tribesNotfound')} image={<Illustration type={IllustrationType.Empty} />} />
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
