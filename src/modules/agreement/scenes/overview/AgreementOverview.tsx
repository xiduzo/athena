import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  Box,
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
  Tooltip,
  Typography,
  Zoom,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import FilterListIcon from '@material-ui/icons/FilterList'
import gql from 'graphql-tag'
import React, { ChangeEvent, FC, Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { and, useHotkeys } from 'src/common/hooks'
import { IRootReducer } from 'src/common/redux'
import { DELETE_AGREEMENT } from 'src/common/services'
import { createFilter, generalCatchHandler, snackbarWrapper } from 'src/common/utils'
import { AgreementCard, AgreementCardMock, EmptyState, Illustration } from 'src/components'
import { WithSidebar } from 'src/components/Templates'
import { AgreementType, IllustrationType, Key } from 'src/lib/enums'
import { Agreement } from 'src/lib/interfaces'
import { NewAgreementModal } from './components/NewAgreementModal'

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing(2),
    zIndex: theme.zIndex.mobileStepper,
    [theme.breakpoints.up('md')]: {
      right: '20vw',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: (theme.mixins.toolbar.minHeight as number) + theme.spacing(2),
    },
  },
  fieldset: {
    marginBottom: theme.spacing(2),
    width: '100%',
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

export const AgreementOverview: FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const [modalOpen, setModalOpen] = useState(false)
  const [filters, setFilters] = useState(initFilters)

  const { loading, error, data, refetch } = useQuery(
    gql`
      query GetAgreements {
        Agreement(filter: { isBase: true }) {
          id
          points
          type
          translations {
            id
            language
            text
          }
        }
      }
    `
  )

  const [DeleteAgreement] = useMutation(DELETE_AGREEMENT)

  const hotkeysEnabled = useSelector((state: IRootReducer) => state.global.hotkeysEnabled)
  const newAgreementHotkey = and([useHotkeys(Key.Alt), useHotkeys(Key.N)])

  const { register, errors } = useForm()

  const handleNameFilter = (event: ChangeEvent<HTMLInputElement>) =>
    setFilters([
      ...initFilters.map((filter) => {
        if (filter.property === event.target.id) filter.value = event.target.value

        return filter
      }),
    ])

  const handleTypeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setFilters(
      filters.map((item) => {
        if (item.property === `type`) item.value = value && value !== '-1' ? value : ''
        return item
      })
    )
  }

  const toggleModal = () => setModalOpen(!modalOpen)

  const closeNewAgreementModalHandle = () => {
    refetch()
    toggleModal()
  }

  const removeAgreementHandler = (agreement: Agreement) => {
    DeleteAgreement({
      variables: {
        id: agreement.id,
      },
    })
      .then(() => {
        snackbarWrapper.success(`${t(`agreement`)} deleted`)
        refetch()
      })
      .catch(generalCatchHandler)
  }

  const mainAction = {
    icon: <AddIcon />,
    event: toggleModal,
    title: t('agreementNew'),
  }

  const showEmptyState = () => (
    <Grid item xs={12}>
      <EmptyState
        title={t('agreementsNotFound')}
        subtitle={t('agreementsNotFoundSubtitle')}
        image={<Illustration type={IllustrationType.NoAgreement} />}
        action={mainAction}
      />
    </Grid>
  )

  useEffect(() => {
    if (!hotkeysEnabled) return
    if (!newAgreementHotkey) return

    setModalOpen(true)
  }, [newAgreementHotkey, hotkeysEnabled])

  const filtered = data?.Agreement?.filter(createFilter(...filters)) as Agreement[]
  return (
    <WithSidebar
      title={t('agreements')}
      action={mainAction}
      mainContent={
        <Grid container spacing={2}>
          <NewAgreementModal isOpen={modalOpen} onClose={closeNewAgreementModalHandle} />
          {loading ? (
            [...Array(12)].map((_, index: number) => (
              <Grid key={index} item xs={12} sm={6} lg={4}>
                <AgreementCardMock />
              </Grid>
            ))
          ) : error ? (
            <div>{error.message}</div>
          ) : !data.Agreement.length ? (
            showEmptyState()
          ) : filtered.length ? (
            filtered.map((agreement: Agreement) => (
              <Grid key={agreement.id} item xs={12} sm={6} lg={4}>
                <AgreementCard
                  agreement={agreement}
                  onRightClickItems={
                    <Box>
                      <MenuItem onClick={() => removeAgreementHandler(agreement)}>
                        <Typography color='error'>{t('remove')}</Typography>
                      </MenuItem>
                    </Box>
                  }
                />
              </Grid>
            ))
          ) : (
            showEmptyState()
          )}
        </Grid>
      }
      drawerIcon={<FilterListIcon />}
      drawerContent={
        <Fragment>
          <Grid container justify='space-between' alignItems='center'>
            <Typography variant='h5'>Filter</Typography>
            {!loading && !error && data.Agreement.length && (
              <Tooltip title={`Amount of agreements left after applying filters`}>
                <Typography variant='caption'>
                  {filtered.length}/{data.Agreement.length}
                </Typography>
              </Tooltip>
            )}
          </Grid>

          <form autoComplete='off'>
            <Grid container>
              <Grid item xs={12}>
                <FormControl component='fieldset' className={classes.fieldset}>
                  <TextField
                    id='translations'
                    name='translations'
                    label={t('theStudent')}
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
                  >
                    <FormControlLabel
                      inputRef={register}
                      value={`-1`}
                      control={<Radio />}
                      label='All'
                    />
                    {[
                      AgreementType.ACCOUNTABILITY,
                      AgreementType.ATTITUDE,
                      AgreementType.FUNCTIONING_WITHIN_TEAM,
                      AgreementType.KNOWLEDGE_DEVELOPMENT,
                    ].map((type) => (
                      <FormControlLabel
                        key={type}
                        inputRef={register}
                        value={`${type}`}
                        control={<Radio />}
                        label={t(AgreementType[type])}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Fragment>
      }
    />
  )
}
