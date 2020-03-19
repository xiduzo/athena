import React, { FC, forwardRef, useState } from 'react'
import {
  Slide,
  Slider,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Theme,
  Container,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import { useForm } from 'react-hook-form'
import { AgreementType } from 'src/lib/enums'
import { IAgreement, ITranslation } from 'src/lib/types/agreement'
import { supportedLanguages } from 'src/i18n'
import { useMutation } from '@apollo/react-hooks'
import { ApolloError } from 'apollo-errors'
import { CREATE_TRANSLATION, ADD_AGREEMENT_TRANSLATION, CREATE_AGREEMENT } from 'src/common/services/agreementService'
import { v4 as uuid } from 'uuid'
import { asyncForEach } from 'src/common/utils/asyncForEach'
import { snackbarWrapper } from 'src/lib/utils/snackbarWrapper'
import { useTranslation } from 'react-i18next'
import { generalCatchHandler } from 'src/common/utils/superagentWrapper'
import { SlideUp } from 'src/components/Atoms/Transitions/SlideUp'

interface INewAgreementModal {
  isOpen: boolean
  onClose?: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

export const NewAgreementModal: FC<INewAgreementModal> = ({ isOpen, onClose }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const [ CreateTranslation ] = useMutation(CREATE_TRANSLATION)
  const [ AddAgreementTranslations ] = useMutation(ADD_AGREEMENT_TRANSLATION)
  const [ CreateAgreement ] = useMutation(CREATE_AGREEMENT)

  const [ sliderValue, setSliderValue ] = useState(0)
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const { register, handleSubmit, errors } = useForm()

  const handleClose = () => {
    onClose && onClose()
  }

  const onSubmit = async (data: Partial<IAgreement>) => {
    if (!data.translations) return // TODO alert
    setIsSubmitting(true)

    let hasError = false

    const agreement: IAgreement = {
      ...data,
      id: uuid(),
      isBase: true,
      translations: Object.keys(data.translations).map((translation: string) => ({
        id: uuid(),
        language: translation,
        text: data.translations ? data.translations[translation] : '',
      })),
      feedback: [],
      type: data.type || AgreementType.ATTITUDE,
      points: sliderValue,
    }

    const catchError = (error: ApolloError) => {
      hasError = !hasError
      generalCatchHandler(error)
    }

    await CreateAgreement({
      variables: {
        ...agreement,
        type: parseInt(`${agreement.type}`, 10),
      },
    }).catch(catchError)

    if (!errors.length) {
      await asyncForEach(agreement.translations || [], async (translation: ITranslation) => {
        await CreateTranslation({
          variables: {
            ...translation,
          },
        }).catch(catchError)

        await AddAgreementTranslations({
          variables: {
            id: uuid(),
            from: { id: agreement.id },
            to: { id: translation.id },
          },
        }).catch(catchError)
      })
    }

    if (!hasError) snackbarWrapper.success(`${t(`agreement`)} created`)

    setIsSubmitting(false)
    handleClose()
  }

  return (
    <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={SlideUp}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge='start' autoFocus color='inherit' onClick={handleClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            New agreement
          </Typography>
          <Button disabled={isSubmitting} color='inherit' onClick={handleSubmit(onSubmit)}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth='lg'>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container direction='column' justify='center' alignItems='center'>
                {supportedLanguages.map((language) => (
                  <Grid item xs={12} key={language}>
                    <TextField
                      name={`translations.${language}`}
                      label={language}
                      inputRef={register({
                        required: { value: true, message: 'Dit veld is verplicht' },
                        // minLength: { value: 10, message: 'Minimaal 10 charaters' },
                        // maxLength: { value: 20, message: 'Max 20 charaters' },
                      })}
                      placeholder='komt altijd optijd'
                      error={errors[`translations`] && errors[`translations`][language] ? true : false}
                      helperText={
                        errors[`translations`] &&
                        errors[`translations`][language] &&
                        (errors[`translations`][language] as any).message
                      }
                      inputProps={{
                        'aria-label': language,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction='column'>
                <Grid item xs={12}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Type</FormLabel>
                    <RadioGroup aria-label='Filter by type' name='type' id='type' defaultValue='0'>
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
                        inputRef={register}
                        value={`${AgreementType.ACCOUNTABILITY}`}
                        control={<Radio />}
                        label='Accountability'
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Slider
                    name='points'
                    value={sliderValue}
                    onChange={(_: any, value: any) => setSliderValue(value)}
                    min={0}
                    max={100}
                    step={1}
                    aria-labelledby='points-slider'
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                name="text"
                inputRef={register({
                  required: { value: true, message: 'Dit veld is verplicht' },
                  minLength: { value: 10, message: 'Minimaal 10 charaters' },
                  maxLength: { value: 20, message: 'Max 20 charaters' },
                })}
                placeholder="komt altijd optijd"
                error={errors.text ? true : false}
                helperText={errors.text && (errors.text as any).message}
                inputProps={{
                  'aria-label': 'text',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="text_eng"
                inputRef={register({ required: { value: true, message: 'Dit veld is verplicht' } })}
                placeholder="is always on time"
                error={errors.text_eng ? true : false}
                helperText={errors.text_eng && (errors.text_eng as any).message}
                inputProps={{
                  'aria-label': 'text_eng',
                }}
              />
            </Grid> */}
            <Grid item xs={12}>
              <Button disabled={isSubmitting} type='submit' variant='contained' color='primary'>
                submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Dialog>
  )
}
