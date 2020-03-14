import {
  Box,
  Container,
  Drawer,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Hidden,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { createFilter } from 'src/common/utils/createFilter'
import { Illustration, Illustrations } from 'src/components/Atoms/Illustration/Illustration'
import { AgreementCard, AgreementCardMock } from 'src/components/Molecules/AgreementCard'
import { EmptyState } from 'src/components/Molecules/EmptyState/EmptyState'
import { addAgreement, getAgreements, removeAgreement } from 'src/lib/api'
import { AgreementType } from 'src/lib/enums'
import { Key } from 'src/lib/enums/keys'
import { useHotkeys } from 'src/lib/hooks/useHotkeys'
import { DispatchAction, IRootReducer } from 'src/lib/redux/rootReducer'
import { IAgreement } from 'src/lib/types/agreement'
import { NewAgreementModal } from './components/newAgreementModal'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const drawerWidth = '20vw'
const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    padding: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    bottom: 0,
    right: drawerWidth,
    margin: theme.spacing(2),
    zIndex: theme.zIndex.mobileStepper,
  },
  main: {
    padding: theme.spacing(2, 3),
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
  fieldset: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  hotkeysInfo: {
    color: theme.palette.grey[400],
    position: 'absolute',
    right: drawerWidth,
    margin: theme.spacing(2),
    '&:hover': {
      cursor: 'help',
    },
  },
  wrapper: {
    display: 'flex',
  },
}))

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

const GET_AGREEMENTS = gql`
  {
    Agreement(filter: { isBase: true }) {
      id
      points
      isBase
      type
      translations {
        language
        text
      }
    }
  }
`

export const AgreementsRoute: FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const dispatch = useDispatch<DispatchAction>()
  const { loading, error, data } = useQuery(GET_AGREEMENTS)

  const hotkeysEnabled = useSelector((state: IRootReducer) => state.global.hotkeysEnabled)

  const [ agreements, setAgreements ] = useState<IAgreement[]>([])
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ filters, setFilters ] = useState(initFilters)
  const [ elementHasFocus, setElementHasFocus ] = useState(false)

  const { register, errors } = useForm()

  const newAgreement = useHotkeys(Key.A)

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

  const toggleFocus = () => {
    setElementHasFocus(!elementHasFocus)
  }

  useEffect(
    () => {
      if (!data) return
      setAgreements(data.Agreement)
    },
    [ data ]
  )

  useEffect(
    () => {
      if (!hotkeysEnabled) return
      if (elementHasFocus) return
      if (!newAgreement) return

      setModalOpen(true)
    },
    [ newAgreement, hotkeysEnabled, elementHasFocus ]
  )

  return (
    <Box className={classes.wrapper}>
      <Container maxWidth='lg' className={classes.main}>
        <Fab
          color='primary'
          aria-label={t('agreementNew')}
          className={classes.fab}
          onClick={() => setModalOpen(!modalOpen)}
        >
          <AddIcon />
        </Fab>
        <NewAgreementModal isOpen={modalOpen} onClose={handleClose} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h4'>{t('agreements')}</Typography>
          </Grid>
          {/* {agreements.status === Status.loading ? (
            [ ...Array(48) ].map((_, index: number) => (
              <Grid key={index} item xs={12} sm={6} lg={4}>
                <AgreementCardMock />
              </Grid>
            ))
          ) : !agreements.items.length ? (
            <Grid item={true} xs={12}>
              <EmptyState title={t('agreementsNotFound')} image={<Illustration type={Illustrations.empty} />} />
            </Grid>
          ) : ( */}
          {loading ? (
            [ ...Array(48) ].map((_, index: number) => (
              <Grid key={index} item xs={12} sm={6} lg={4}>
                <AgreementCardMock />
              </Grid>
            ))
          ) : error ? (
            <div>{error.message}</div>
          ) : !agreements.length ? (
            <div>no agreements</div>
          ) : (
            agreements.filter(createFilter(...filters)).map((agreement: IAgreement) => (
              <Grid key={agreement.id} item xs={12} sm={6} lg={4}>
                <AgreementCard
                  agreement={agreement}
                  onRightClickItems={
                    <Box>
                      <MenuItem onClick={() => removeAgreementHandler(agreement.id)}>
                        <Typography color='error'>Remove agreement</Typography>
                      </MenuItem>
                    </Box>
                  }
                />
              </Grid>
            ))
          )}
          {/* )) */}
          {/* )} */}
        </Grid>
      </Container>
      <Hidden smDown={true}>
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
          <form autoComplete='off'>
            <Grid container>
              <Grid item xs={12}>
                <FormControl component='fieldset' className={classes.fieldset}>
                  <TextField
                    id='translations'
                    name='translations'
                    label={t('agreement')}
                    onFocus={toggleFocus}
                    onBlur={toggleFocus}
                    onChange={handleNameFilter}
                    inputRef={register}
                    error={errors.text ? true : false}
                    helperText={errors.text && (errors.text as any).message}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component='fieldset' className={classes.fieldset}>
                  <FormLabel component='legend'>Type</FormLabel>
                  <RadioGroup
                    aria-label='Filter by type'
                    name='type'
                    id='type'
                    defaultValue='-1'
                    onChange={handleTypeFilter}
                    onFocus={toggleFocus}
                    onBlur={toggleFocus}
                  >
                    <FormControlLabel inputRef={register} value={`-1`} control={<Radio />} label='All' />
                    <FormControlLabel
                      inputRef={register}
                      value={`${AgreementType.ATTITUDE}`}
                      control={<Radio />}
                      label='Attitude'
                    />
                    <FormControlLabel
                      inputRef={register}
                      value={`${AgreementType.FUNCTIONING_WITHING_TEAM}`}
                      control={<Radio />}
                      label='Functioning'
                    />
                    <FormControlLabel
                      inputRef={register}
                      value={`${AgreementType.KNOWLEDGE_DEVELOPMENT}`}
                      control={<Radio />}
                      label='Knowledge'
                    />
                    <FormControlLabel
                      value={`${AgreementType.ACCOUNTABILITY}`}
                      control={<Radio />}
                      label='Accountability'
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Drawer>
      </Hidden>
    </Box>
  )
}
