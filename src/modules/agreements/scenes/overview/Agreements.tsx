import React, { FC, useEffect, useState, ChangeEvent, Dispatch, useMemo } from 'react'
import { useStyles } from './style'

import {
  Container,
  Grid,
  Typography,
  Drawer,
  Fab,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Zoom,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { IAgreement } from 'src/lib/types/agreement'

import { getAgreements } from 'src/lib/api'
import { AgreementCard, AgreementCardMock } from 'src/components/Molecules/AgreementCard'
import { EmptyState } from 'src/components/Molecules/EmptyState/EmptyState'

import { Illustration, Illustrations } from 'src/components/Atoms/Illustration/Illustration'
import { useDispatch, useSelector } from 'react-redux'
import { IRootReducer, Status, IAction } from 'src/lib/redux'
import { IAgreementsState } from 'src/lib/redux/agreements/agreementsReducer'
import { AgreementType } from 'src/lib/enums'
import { NewAgreementModal } from './components/newAgreementModal'

export const AgreementsRoute: FC = () => {
  const classes = useStyles()

  const dispatch = useDispatch<Dispatch<(dispatch: Dispatch<IAction>) => void>>()
  const agreements = useSelector<IRootReducer, IAgreementsState>((state) => state.agreements)
  const [ filteredAgreements, setFilteredAgreements ] = useState<IAgreement[]>([])
  const [ filterByText, setFilterByText ] = useState('')
  const [ filterByType, setFilterByType ] = useState(`-1`)
  const [ modalOpen, setModalOpen ] = useState(false)

  useEffect(
    () => {
      let newAgreements = agreements.items.filter((agreement: IAgreement) => agreement.text.includes(filterByText))

      if (filterByType !== `-1`) {
        newAgreements = newAgreements.filter((agreement: IAgreement) => `${agreement.type.valueOf()}` === filterByType)
      }

      setFilteredAgreements(newAgreements)
    },
    [ filterByText, filterByType, agreements.items ]
  )

  useEffect(
    () => {
      dispatch(getAgreements())
    },
    [ dispatch ]
  )

  useMemo(
    () => {
      setFilteredAgreements(agreements.items)
    },
    [ agreements.items ]
  )

  const handleClose = () => {
    console.log(true)
    setModalOpen(!modalOpen)
  }

  return (
    <section className={classes.root}>
      <Zoom in={!modalOpen} style={{ transitionDelay: '200ms' }}>
        <Fab
          color="primary"
          aria-label="New agreement"
          className={classes.fab}
          onClick={() => setModalOpen(!modalOpen)}
        >
          <AddIcon />
        </Fab>
      </Zoom>
      <NewAgreementModal isOpen={modalOpen} onClose={handleClose} />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {agreements.status === Status.loading &&
            [ ...new Array(48) ].map((_, index: number) => (
              <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
                <AgreementCardMock />
              </Grid>
            ))}
          {agreements.status !== Status.loading &&
          !filteredAgreements.length && (
            <Grid item={true} xs={12}>
              <EmptyState title={`No agreements found`} image={<Illustration type={Illustrations.empty} />} />
            </Grid>
          )}
          {agreements.status !== Status.loading &&
            filteredAgreements.map((agreement: IAgreement) => (
              <Grid key={agreement.guid} item xs={12} md={6} lg={4} xl={3}>
                <AgreementCard agreement={agreement} />
              </Grid>
            ))}
        </Grid>
      </Container>
      <Drawer
        variant="permanent"
        anchor="right"
        className={classes.drawer}
        classes={{
          paper: classes.drawer,
        }}
      >
        <div className={classes.toolbar} />
        <Typography component="h2" variant="h5">
          Filter
        </Typography>
        <FormControl component="fieldset" className={classes.fieldset}>
          <TextField
            id="filter by name"
            label="Name"
            margin="normal"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setFilterByText(event.target.value)
            }}
          />
        </FormControl>
        <FormControl component="fieldset" className={classes.fieldset}>
          <FormLabel component="legend">Type</FormLabel>
          <RadioGroup
            aria-label="type"
            name="type"
            value={filterByType}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setFilterByType(event.target.value)
            }}
          >
            <FormControlLabel value={`-1`} control={<Radio />} label="All" />
            <FormControlLabel value={`${AgreementType.ATTITUDE}`} control={<Radio />} label="Attitude" />
            <FormControlLabel
              value={`${AgreementType.FUNCTIONING_WITHING_TEAM}`}
              control={<Radio />}
              label="Functioning"
            />
            <FormControlLabel value={`${AgreementType.KNOWLEDGE_DEVELOPMENT}`} control={<Radio />} label="Knowledge" />
            <FormControlLabel value={`${AgreementType.ACCOUNTABILITY}`} control={<Radio />} label="Accountability" />
          </RadioGroup>
        </FormControl>
      </Drawer>
    </section>
  )
}
