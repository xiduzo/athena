import React, { FC, useEffect, useState, Dispatch, ChangeEvent, Fragment } from 'react'
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
  MenuItem,
  Box,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { IAgreement } from 'src/lib/types/agreement'

import { getAgreements, addAgreement, removeAgreement } from 'src/lib/api'
import { AgreementCard, AgreementCardMock } from 'src/components/Molecules/AgreementCard'
import { EmptyState } from 'src/components/Molecules/EmptyState/EmptyState'

import { Illustration, Illustrations } from 'src/components/Atoms/Illustration/Illustration'
import { useDispatch, useSelector } from 'react-redux'
import { IRootReducer, Status, IAction } from 'src/lib/redux'
import { IAgreementsState } from 'src/lib/redux/agreements/agreementsReducer'
import { AgreementType } from 'src/lib/enums'
import { NewAgreementModal } from './components/newAgreementModal'
import { useForm } from 'react-hook-form'
import { createFilter } from 'src/common/utils/createFilter'

const initFilters = [
  // {
  //   property: 'translations',
  //   value: '',
  // },
  {
    property: 'type',
    value: '',
  },
]

export const AgreementsRoute: FC = () => {
  const classes = useStyles()

  const dispatch = useDispatch<Dispatch<(dispatch: Dispatch<IAction>) => void>>()
  const agreements = useSelector<IRootReducer, IAgreementsState>((state) => state.agreements)
  const [ modalOpen, setModalOpen ] = useState(false)
  const { register, errors } = useForm()
  const [ filters, setFilters ] = useState(initFilters)

  const handleNameFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters([
      ...initFilters.map((filter) => {
        if (filter.property === event.target.id) filter.value = event.target.value

        return filter
      }),
    ])
    console.log(filters)
  }

  const handleTypeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters((current) =>
      current.map((item) => {
        if (item.property === `type`) item.value = event.target.value !== '-1' ? event.target.value : ''

        return item
      })
    )
  }

  const handleClose = (agreement?: IAgreement) => {
    if (agreement) dispatch(addAgreement(agreement))
    setModalOpen(!modalOpen)
  }

  const removeAgreementHandler = (agreementId: string) => {
    dispatch(removeAgreement(agreementId))
  }

  useEffect(
    () => {
      dispatch(getAgreements())
    },
    [ dispatch ]
  )

  return (
    <Fragment>
      <Container maxWidth="lg" className={classes.main}>
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Agreements</Typography>
          </Grid>
          {agreements.status === Status.loading ? (
            [ ...Array(48) ].map((_, index: number) => (
              <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
                <AgreementCardMock />
              </Grid>
            ))
          ) : !agreements.items.length ? (
            <Grid item={true} xs={12}>
              <EmptyState title={`No agreements found`} image={<Illustration type={Illustrations.empty} />} />
            </Grid>
          ) : (
            agreements.items.filter(createFilter(...filters)).map((agreement: IAgreement) => (
              <Grid key={agreement.id} item xs={12} md={6} lg={4} xl={3}>
                <AgreementCard
                  agreement={agreement}
                  onRightClickItems={
                    <Box>
                      <MenuItem onClick={() => removeAgreementHandler(agreement.id)}>
                        <Typography color="error">Remove agreement</Typography>
                      </MenuItem>
                    </Box>
                  }
                />
              </Grid>
            ))
          )}
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
        <form autoComplete="off">
          <Grid container>
            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.fieldset}>
                <TextField
                  id="translations"
                  name="translations"
                  label="Name"
                  onChange={handleNameFilter}
                  inputRef={register}
                  error={errors.text ? true : false}
                  helperText={errors.text && (errors.text as any).message}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.fieldset}>
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup
                  aria-label="Filter by type"
                  name="type"
                  id="type"
                  defaultValue="-1"
                  onChange={handleTypeFilter}
                >
                  <FormControlLabel inputRef={register} value={`-1`} control={<Radio />} label="All" />
                  <FormControlLabel
                    inputRef={register}
                    value={`${AgreementType.ATTITUDE}`}
                    control={<Radio />}
                    label="Attitude"
                  />
                  <FormControlLabel
                    inputRef={register}
                    value={`${AgreementType.FUNCTIONING_WITHING_TEAM}`}
                    control={<Radio />}
                    label="Functioning"
                  />
                  <FormControlLabel
                    inputRef={register}
                    value={`${AgreementType.KNOWLEDGE_DEVELOPMENT}`}
                    control={<Radio />}
                    label="Knowledge"
                  />
                  <FormControlLabel
                    value={`${AgreementType.ACCOUNTABILITY}`}
                    control={<Radio />}
                    label="Accountability"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Drawer>
    </Fragment>
  )
}
