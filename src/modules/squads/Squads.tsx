import React, { FC, useEffect, Dispatch, useState } from 'react'
import { getSquads } from 'src/lib/api'
import { Container, Grid, makeStyles, Theme, Typography, FormControl, TextField, Paper, Box } from '@material-ui/core'
import { SquadCard, SquadCardMock } from 'src/components/Molecules/SquadCard'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IAction, Status, IRootReducer } from 'src/lib/redux'
import { ISquadsState } from 'src/lib/redux/squads/squadsReducer'
import { useForm } from 'react-hook-form'
import { createFilter } from 'src/common/utils/createFilter'

const useStyles = makeStyles((theme: Theme) => {
  return {
    fab: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      margin: theme.spacing(2),
    },
    main: {
      padding: theme.spacing(2, 0),
    },
  }
})

export const SquadsRoute: FC = () => {
  const classes = useStyles()
  const { register, errors } = useForm()

  const [ filters, setFilters ] = useState([])

  const dispatch = useDispatch<Dispatch<(dispatch: Dispatch<IAction>) => void>>()
  const squads = useSelector<IRootReducer, ISquadsState>((state) => state.squads)

  const location = useLocation()
  const history = useHistory()

  useEffect(
    () => {
      dispatch(getSquads())
    },
    [ dispatch ]
  )

  const navigateToSquad = (id: string) => {
    history.push(`${location.pathname}/${id}`)
  }

  const handleFilter = () => {
    setFilters([])
  }

  return (
    <section className={classes.main}>
      <Container maxWidth={`lg`}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Squads</Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Box p={2}>
                <form autoComplete="off">
                  <FormControl component="fieldset">
                    <Typography variant="h6">Filter</Typography>
                    <TextField
                      id="filterByName"
                      name="filterByName"
                      label="Name"
                      placeholder="Filter by name"
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
        </Grid>
      </Container>
    </section>
  )
}
