import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  Box,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
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
import { and, useHotkeys, useWidth } from 'src/common/hooks'
import { IRootReducer } from 'src/common/redux'
import { DELETE_AGREEMENT } from 'src/common/services'
import { createFilter, generalCatchHandler, snackbarWrapper } from 'src/common/utils'
import { AgreementCard, AgreementCardMock, EmptyState, Illustration } from 'src/components'
import { WithSidebar } from 'src/components/Templates'
import { AgreementType, IllustrationType, Key } from 'src/lib/enums'
import { IAgreement } from 'src/lib/interfaces'
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
  const width = useWidth()

  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
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

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)
  const toggleModal = () => setModalOpen(!modalOpen)

  const closeNewAgreementModalHandle = (): void => {
    refetch()
    toggleModal()
  }

  const removeAgreementHandler = (agreement: IAgreement): void => {
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

  useEffect(() => {
    if (!hotkeysEnabled) return
    if (!newAgreementHotkey) return

    setModalOpen(true)
  }, [newAgreementHotkey, hotkeysEnabled])

  useEffect(() => {
    if (['xs', 'sm'].indexOf(width) === -1) setDrawerOpen(false)
  }, [width])

  console.log(AgreementType, Object.values(AgreementType))

  return (
    <WithSidebar
      title={t('agreements')}
      mainContent={
        <Fragment>
          <Zoom in={!loading && !error}>
            <Fab
              color='primary'
              aria-label={t('agreementNew')}
              className={classes.fab}
              onClick={toggleModal}
            >
              <AddIcon />
            </Fab>
          </Zoom>
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
            <Grid item={true} xs={12}>
              <EmptyState
                title={t('agreementsNotFound')}
                image={<Illustration type={IllustrationType.Empty} />}
              />
            </Grid>
          ) : (
            data.Agreement.filter(createFilter(...filters)).map((agreement: IAgreement) => (
              <Grid key={agreement.id} item xs={12} sm={6} lg={4}>
                <AgreementCard
                  agreement={agreement}
                  onRightClickItems={
                    <Box>
                      <MenuItem onClick={() => removeAgreementHandler(agreement)}>
                        <Typography color='error'>Remove agreement</Typography>
                      </MenuItem>
                    </Box>
                  }
                />
              </Grid>
            ))
          )}
        </Fragment>
      }
      drawerIcon={<FilterListIcon />}
      drawerContent={
        <Fragment>
          <Grid container justify='space-between' alignItems='center'>
            <Typography variant='h5'>Filter</Typography>
            {!loading && !error && data.Agreement.length && (
              <Tooltip title={`Amount of agreements left after applying filters`}>
                <Typography variant='caption'>
                  {data.Agreement.filter(createFilter(...filters)).length}
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
                    {Object.values(AgreementType).map((type) => (
                      <FormControlLabel
                        key={type}
                        inputRef={register}
                        value={`${type}`}
                        control={<Radio />}
                        label={AgreementType[type]}
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
