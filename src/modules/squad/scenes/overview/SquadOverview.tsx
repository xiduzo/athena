import { useQuery } from '@apollo/react-hooks'
import { Container, Fab, Grid, makeStyles, Theme, Typography, Zoom } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import gql from 'graphql-tag'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'
import { ContentHeader, EmptyState, Illustration, SquadCard, SquadCardMock } from 'src/components'
import { ISquad } from 'src/lib/interfaces'
import { NewSquadModal } from './components'
import { IllustrationType } from 'src/lib/enums'
import { userInfo } from 'os'
import { useSelector } from 'react-redux'
import { IRootReducer } from 'src/common/redux'

const useStyles = makeStyles((theme: Theme) => {
  return {
    // TODO make default fab component
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

export const SquadOverview: FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const _selectedTribe = useSelector((state: IRootReducer) => state.global.selectedTribe)

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const { loading, error, data, refetch } = useQuery(
    gql`
      query GetSquads($selectedTribeId: String!) {
        Squad(filter: { tribe: { id: $selectedTribeId } }) {
          id
          name
        }
      }
    `,
    {
      variables: {
        selectedTribeId: _selectedTribe,
      },
    }
  )

  const location = useLocation()
  const history = useHistory()

  const navigateToSquad = (id: string): void => history.push(`${location.pathname}/${id}`)

  const handleClose = (): void => {
    refetch()
    setModalOpen(!modalOpen)
  }

  return (
    <Container maxWidth={`lg`} className={classes.root}>
      <ContentHeader />

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
      <NewSquadModal isOpen={modalOpen} onClose={handleClose} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h4'>{t('squads')}</Typography>
        </Grid>
        {loading ? (
          Array.from({ length: 12 }).map((_, index: number) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <SquadCardMock />
            </Grid>
          ))
        ) : error ? (
          <div>{error.message}</div>
        ) : !data.Squad.length ? (
          <Grid item xs={12}>
            <EmptyState
              title={t('squadsNotFound')}
              image={<Illustration type={IllustrationType.NoSquad} />}
            />
          </Grid>
        ) : (
          data.Squad.map((squad: ISquad) => (
            <Grid key={squad.id} item xs={12} sm={6} md={4} lg={3}>
              <SquadCard squad={squad} onLeftClick={() => navigateToSquad(squad.id)} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  )
}
