import {
  AppBar,
  Button,
  Container,
  Dialog,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  Grid,
  TextField,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SlideUp } from 'src/components/Atoms/Transitions/SlideUp'
import { IModalBase, ITribe, ISquad } from 'src/lib/interfaces'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_TRIBE } from 'src/common/services/tribeService'
import { v4 as uuid } from 'uuid'
import { generalCatchHandler } from 'src/common/utils/superagentWrapper'
import { ApolloError } from 'apollo-errors'
import { snackbarWrapper } from 'src/common/utils/snackbarWrapper'
import { CREATE_SQUAD } from 'src/common/services/squadService'

interface INewSquadModal extends IModalBase {}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

export const NewSquadModal: FC<INewSquadModal> = ({ isOpen, onClose }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const { register, handleSubmit, errors } = useForm()

  const [ CreateSquad ] = useMutation(CREATE_SQUAD)

  const handleClose = () => {
    onClose && onClose<undefined>()
  }
  const onSubmit = async (data: Partial<ISquad>) => {
    setIsSubmitting(true)

    let hasError = false

    const squad = {
      ...data,
      id: uuid(),
    }

    const catchError = (error: ApolloError) => {
      hasError = !hasError
      generalCatchHandler(error)
    }

    await CreateSquad({
      variables: {
        ...squad,
      },
    }).catch(catchError)

    if (!hasError) snackbarWrapper.success(`${t(`squad`)} created`)

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
              {t(`squadNew`)}
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
