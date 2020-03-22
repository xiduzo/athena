import { useQuery } from '@apollo/react-hooks'
import { Container, Fab, Grid, Typography, makeStyles, Theme, Zoom } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import React, { FC, useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Illustration, Illustrations } from 'src/components/Atoms/Illustration/Illustration'
import { EmptyState } from 'src/components/Molecules/EmptyState'
import { TribeCard, TribeCardMock } from 'src/components/Molecules/TribeCard'
import { ITribe } from 'src/lib/interfaces'
import { useTranslation } from 'react-i18next'
import gql from 'graphql-tag'
import { NewTribeModal } from './components/NewTribeModal'
import { useSelector } from 'react-redux'
import { IRootReducer } from 'src/common/redux/rootReducer'
import { and, useHotkeys } from 'src/common/hooks/useHotkeys'
import { Key } from 'src/lib/enums/Key'

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

export const TribesRoute: FC = () => {
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
