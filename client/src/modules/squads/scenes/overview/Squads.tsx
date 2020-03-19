import { useQuery } from '@apollo/react-hooks'
import { Container, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import gql from 'graphql-tag'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'
import { Illustration, Illustrations } from 'src/components/Atoms/Illustration/Illustration'
import { EmptyState } from 'src/components/Molecules/EmptyState/EmptyState'
import { SquadCard, SquadCardMock } from 'src/components/Molecules/SquadCard'
import { ISquad } from 'src/lib/interfaces'

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

export const SquadsRoute: FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const [ filters, setFilters ] = useState([])

  const { register, errors } = useForm()

  const [ pageQuery ] = useState(gql`
    query {
      Squad {
        id
        name
      }
    }
  `)

  const { loading, error, data } = useQuery(pageQuery)

  const location = useLocation()
  const history = useHistory()

  const navigateToSquad = (id: string) => history.push(`${location.pathname}/${id}`)

  const handleFilter = () => {
    setFilters([])
  }

  return (
    <Container maxWidth={`lg`} className={classes.root}>
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
            <EmptyState title={t('squadsNotFound')} image={<Illustration type={Illustrations.empty} />} />
          </Grid>
        ) : (
          data.Squad[0].map((squad: ISquad) => (
            <Grid key={squad.id} item xs={12} sm={6} md={4} lg={3}>
              <SquadCard squad={squad} onLeftClick={() => navigateToSquad(squad.id)} />
            </Grid>
          ))
        )}
      </Grid>
      {/* <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h4'>Squads</Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Box p={2}>
              <form autoComplete='off'>
                <FormControl component='fieldset'>
                  <Typography variant='h6'>Filter</Typography>
                  <TextField
                    id='filterByName'
                    name='filterByName'
                    label='Name'
                    placeholder='Filter by name'
                    fullWidth
                    onChange={handleFilter}
                    inputRef={register}
                    error={errors.text ? true : false}
                    helperText={errors.text && (errors.text as any).message}
                  />
                </FormControl>
              </form>
            </Box>
          </Paper>
        </Grid>
        {squads.status === Status.loading &&
          [ ...new Array(48) ].map((_, index: number) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <SquadCardMock />
            </Grid>
          ))}
        {squads.status !== Status.loading &&
          squads.items.filter(createFilter(...filters)).map((squad) => (
            <Grid key={squad.id} item xs={12} sm={6} md={4} lg={3}>
              <SquadCard squad={squad} onLeftClick={() => navigateToSquad(squad.id)} />
            </Grid>
          ))}
      </Grid> */}
    </Container>
  )
}
