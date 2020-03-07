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
import { IAgreement } from 'src/lib/types/agreement'
import { supportedLanguages } from 'src/i18n'

const Transition = forwardRef<unknown, TransitionProps>((props, ref) => <Slide direction='up' ref={ref} {...props} />)

interface INewAgreementModal {
  isOpen: boolean
  onClose?: (agreement?: IAgreement) => void
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
  const { register, handleSubmit, errors } = useForm()

  const [ sliderValue, setSliderValue ] = useState(0)

  const handleClose = () => {
    console.log(true)
    onClose && onClose()
  }

  const onSubmit = (data: any) => {
    const agreement: IAgreement = {
      ...data,
      type: parseInt(data.type, 10),
      translations: Object.keys(data.translations).map((translation: string) => ({
        language: translation,
        text: data.translations[translation],
      })),
      points: sliderValue,
    }

    onClose && onClose(agreement)
  }

  return (
    <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            New agreement
          </Typography>
          <Button autoFocus color='inherit' onClick={handleSubmit(onSubmit)}>
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
              <Button type='submit' variant='contained' color='primary'>
                submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Dialog>
  )
}
