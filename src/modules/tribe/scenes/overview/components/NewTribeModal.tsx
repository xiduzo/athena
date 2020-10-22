import { useMutation } from '@apollo/react-hooks'
import {
  AppBar,
  Button,
  Container,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { ApolloError } from 'apollo-errors'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CREATE_TRIBE } from 'src/common/services'
import { generalCatchHandler, getNeo4jDateObject, snackbarWrapper } from 'src/common/utils'
import { IModalBase, ITribe } from 'src/lib/interfaces'
import { v4 as uuid } from 'uuid'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

interface INewTribeModal extends IModalBase {}

export const NewTribeModal: FC<INewTribeModal> = (props) => {
  /*
   * State
   */
  const { isOpen, onClose } = props

  const [selectedDate, handleDateChange] = useState(new Date())

  /*
   * Hooks
   */
  const classes = useStyles()
  const { t } = useTranslation()
  const { register, handleSubmit, errors, formState } = useForm()

  const [CreateTribe] = useMutation(CREATE_TRIBE)
  /*
   * Methods
   */
  const handleClose = () => onClose && onClose<undefined>()

  const onSubmit = async (data: Partial<ITribe>) => {
    let hasError = false

    const catchError = (error: ApolloError) => {
      hasError = !hasError
      generalCatchHandler(error)
    }

    await CreateTribe({
      variables: {
        ...data,
        id: uuid(),
        start: getNeo4jDateObject(),
        end: getNeo4jDateObject(),
      },
    }).catch(catchError)

    if (!hasError) snackbarWrapper.success(`${t(`tribe`)} created`)

    handleClose()
  }

  /*
   * Side effects
   */

  /*
   * Render
   */
  return (
    <Dialog fullScreen open={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <AppBar position={`relative`}>
          <Toolbar>
            <IconButton
              edge='start'
              autoFocus
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {t(`tribeNew`)}
            </Typography>
            <Button
              type='submit'
              disabled={formState.isSubmitting}
              color='inherit'
              onClick={handleSubmit(onSubmit)}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth='lg'>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                name={t('name')}
                inputRef={register({
                  required: { value: true, message: t('thisFieldIsRequired') },
                })}
                placeholder={t('name')}
                error={errors.name ? true : false}
                helperText={errors.name && (errors.name as any).message}
                inputProps={{
                  'aria-label': t('name'),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <KeyboardDatePicker
                autoOk
                label={t('startDate')}
                value={selectedDate}
                minDate={new Date()}
                onChange={(date) => handleDateChange(date?.toJSDate() ?? new Date())}
                format='DD/MM/YYYY'
                orientation={'landscape'}
              />
            </Grid>
          </Grid>
        </Container>
      </form>
    </Dialog>
  )
}
