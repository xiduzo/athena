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
import { ApolloError } from 'apollo-errors'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CREATE_TRIBE } from 'src/common/services'
import { generalCatchHandler, snackbarWrapper } from 'src/common/utils'
import { SlideUp } from 'src/components'
import { IModalBase, ITribe } from 'src/lib/interfaces'
import { v4 as uuid } from 'uuid'

interface INewTribeModal extends IModalBase {}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

export const NewTribeModal: FC<INewTribeModal> = ({ isOpen, onClose }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const { register, handleSubmit, errors } = useForm()

  const [ CreateTribe ] = useMutation(CREATE_TRIBE)

  const handleClose = () => {
    onClose && onClose<undefined>()
  }
  const onSubmit = async (data: Partial<ITribe>) => {
    setIsSubmitting(true)

    let hasError = false

    const tribe = {
      ...data,
      id: uuid(),
    }

    const catchError = (error: ApolloError) => {
      hasError = !hasError
      generalCatchHandler(error)
    }

    await CreateTribe({
      variables: {
        ...tribe,
      },
    }).catch(catchError)

    if (!hasError) snackbarWrapper.success(`${t(`tribe`)} created`)

    setIsSubmitting(false)
    handleClose()
  }
  return (
    <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={SlideUp}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <AppBar position={`relative`}>
          <Toolbar>
            <IconButton edge='start' autoFocus color='inherit' onClick={handleClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {t(`tribeNew`)}
            </Typography>
            <Button type='submit' disabled={isSubmitting} color='inherit' onClick={handleSubmit(onSubmit)}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth='lg'>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                name='name'
                inputRef={register({ required: { value: true, message: 'Dit veld is verplicht' } })}
                placeholder='Name'
                error={errors.name ? true : false}
                helperText={errors.name && (errors.name as any).message}
                inputProps={{
                  'aria-label': 'name',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </form>
    </Dialog>
  )
}
