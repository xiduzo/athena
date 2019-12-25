import React, { FC, useEffect, useState, ChangeEvent, Dispatch } from 'react'
import { useStyles } from './style'

import { Container, Grid, Typography, Drawer, Fab, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { IAgreement } from 'src/lib/types/agreement'

import { getAgreements } from 'src/lib/api'
import { AgreementCard, AgreementCardMock } from 'src/components/Molecules/AgreementCard'
import { EmptyState } from 'src/components/Molecules/EmptyState/EmptyState'

import { Illustration, Illustrations } from 'src/components/Atoms/Illustration/Illustration'
import { useDispatch, useSelector } from 'react-redux'
import { IAction } from 'src/lib/redux/agreements/agreementsReducer'
import { IRootReducer } from 'src/lib/redux'

export const AgreementsRoute: FC = () => {
  const classes = useStyles()

  const dispatch = useDispatch<Dispatch<(dispatch: Dispatch<IAction>) => void>>()
  const agreements = useSelector<IRootReducer, IAgreement[]>(state => state.agreements.items)
  const [filteredAgreements, setFilteredAgreements] = useState<IAgreement[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const filterAgreements = (event: ChangeEvent<HTMLInputElement>) => {
    const filter: string = event.target.value
    const newAgreements = agreements.filter((agreement: IAgreement) =>
      agreement.text.includes(filter)
    )

    setFilteredAgreements(newAgreements)
  }

  useEffect(() => {
    dispatch(getAgreements())
  }, [dispatch])

  return (
    <section className={classes.root}>
      <Fab color='primary' aria-label='New agreement' className={classes.fab}>
        <AddIcon />
      </Fab>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          {loading &&
            [ ...new Array(48) ].map((_, index: number) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <AgreementCardMock />
              </Grid>
            ))}
          {!loading && !agreements.length && (
            <Grid item={true} xs={12}>
              <EmptyState title={`No agreements found`} image={<Illustration type={Illustrations.empty} />} />
            </Grid>
          )}
          {!loading &&
            agreements.map((agreement: any, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <AgreementCard agreement={agreement} />
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
        <div className={classes.toolbar} />
        <Typography component='h2' variant='h5'>
          Filter
        </Typography>
        <TextField
          id='filter by name'
          label='Name'
          // className={classes.textField}
          margin='normal'
          onChange={filterAgreements}
        />
      </Drawer>
    </section>
  )
}
