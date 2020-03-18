import { useMutation, useQuery } from '@apollo/react-hooks'
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
import {
  ADD_AGREEMENT_TRANSLATION,
  CREATE_AGREEMENT,
  CREATE_TRANSLATION,
  DELETE_AGREEMENT,
  GET_AGREEMENTS,
} from 'src/common/services/agreementService'
import { asyncForEach } from 'src/common/utils/asyncForEach'
import { createFilter } from 'src/common/utils/createFilter'
import { Illustration, Illustrations } from 'src/components/Atoms/Illustration/Illustration'
import { AgreementCard, AgreementCardMock } from 'src/components/Molecules/AgreementCard'
import { EmptyState } from 'src/components/Molecules/EmptyState/EmptyState'
import { AgreementType } from 'src/lib/enums'
import { Key } from 'src/lib/enums/keys'
import { useHotkeys } from 'src/lib/hooks/useHotkeys'
import { DispatchAction, IRootReducer } from 'src/lib/redux/rootReducer'
import { IAgreement, ITranslation } from 'src/lib/types/agreement'
import { v4 as uuid } from 'uuid'
import { NewAgreementModal } from './components/newAgreementModal'

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

export const AgreementsRoute: FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const dispatch = useDispatch<DispatchAction>()
  const { loading, error, data, refetch } = useQuery(GET_AGREEMENTS, {
    variables: {
      filter: {
        isBase: true,
      },
    },
  })
  const [ CreateTranslation ] = useMutation(CREATE_TRANSLATION)
  const [ DeleteAgreement ] = useMutation(DELETE_AGREEMENT)
  const [ AddAgreementTranslations ] = useMutation(ADD_AGREEMENT_TRANSLATION)
  const [ CreateAgreement ] = useMutation(CREATE_AGREEMENT)

  const hotkeysEnabled = useSelector((state: IRootReducer) => state.global.hotkeysEnabled)
  const newAgreementHotkey = useHotkeys(Key.A)

  const [ modalOpen, setModalOpen ] = useState(false)
  const [ filters, setFilters ] = useState(initFilters)
  const [ elementHasFocus, setElementHasFocus ] = useState(false)

  const { register, errors } = useForm()

  const handleNameFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters([
      ...initFilters.map((filter) => {
        if (filter.property === event.target.id) filter.value = event.target.value

        return filter
      }),
    ])
  }

  const handleTypeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setFilters(
      filters.map((item) => {
        if (item.property === `type`) item.value = value && value !== '-1' ? value : ''
        return item
      })
    )
  }

  const handleClose = async (agreement?: IAgreement) => {
    if (agreement) {
      const agreementId = uuid()

      await CreateAgreement({
        variables: {
          id: agreementId,
          isBase: true,
          ...agreement,
        },
      })

      await asyncForEach(agreement.translations, async (translation: ITranslation) => {
        const translationId = uuid()

        await CreateTranslation({
          variables: {
            id: translationId,
            ...translation,
          },
        })

        await AddAgreementTranslations({
          variables: {
            id: uuid(),
            from: { id: agreementId },
            to: { id: translationId },
          },
        })
      })

      refetch()
    }
    setModalOpen(!modalOpen)
  }

  const removeAgreementHandler = async (agreementId: string) => {
    await DeleteAgreement({
      variables: {
        id: agreementId,
      },
    })
    refetch()
  }

  const toggleFocus = () => setElementHasFocus(!elementHasFocus)

  useEffect(
    () => {
      if (elementHasFocus) return
      if (!hotkeysEnabled) return
      if (!newAgreementHotkey) return

      setModalOpen(true)
    },
    [ newAgreementHotkey, hotkeysEnabled, elementHasFocus ]
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
          {loading ? (
            [ ...Array(12) ].map((_, index: number) => (
              <Grid key={index} item xs={12} sm={6} lg={4}>
                <AgreementCardMock />
              </Grid>
            ))
          ) : error ? (
            <div>{error.message}</div>
          ) : !data.Agreement.length ? (
            <Grid item={true} xs={12}>
              <EmptyState title={t('agreementsNotFound')} image={<Illustration type={Illustrations.empty} />} />
            </Grid>
          ) : (
            data.Agreement.filter(createFilter(...filters)).map((agreement: IAgreement) => (
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
