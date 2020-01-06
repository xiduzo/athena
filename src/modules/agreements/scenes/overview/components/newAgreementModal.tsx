import React, { FC, forwardRef } from 'react'
import {
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Theme,
  Container,
  Input,
  Grid,
  TextField,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import { useForm } from 'react-hook-form'

const Transition = forwardRef<unknown, TransitionProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />)

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
  const { register, handleSubmit, errors } = useForm()

  const handleClose = () => {
    onClose && onClose()
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            New agreement
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSubmit(onSubmit)}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
            <Grid item xs={12}>
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
              <Input
                name="text_eng"
                inputRef={register({ required: true })}
                placeholder="is always on time"
                error={errors.text ? true : false}
                inputProps={{
                  'aria-label': 'text',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Dialog>
  )
}
