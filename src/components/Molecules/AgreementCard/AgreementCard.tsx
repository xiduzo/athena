import React, { FC, useState, Dispatch } from 'react'
import { IAgreement, ITranslation } from 'src/lib/types/agreement'
import {
  Card,
  CardActionArea,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  makeStyles,
  Theme,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { AgreementIcon } from 'src/components/Atoms'
import i18n from 'src/i18n'
import { useDispatch } from 'react-redux'
import { IAction } from 'src/lib/redux'
import { removeAgreement } from 'src/lib/api'

interface IAgreementCard {
  agreement: IAgreement
  onClick?: () => void
}

export const AgreementCardClasses = makeStyles((theme: Theme) => ({
  agreementAvatar: {
    background: 'none',
    '& svg': {
      fill: theme.palette.secondary.contrastText,
    },
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardHeader: {
    padding: theme.spacing(3.5, 1),
    background: theme.palette.secondary.main,
    '& > *': {
      margin: '0',
    },
  },
  cardContent: {
    textAlign: 'center',
    padding: theme.spacing(1),
    flexGrow: 1,
  },
}))

export const AgreementCard: FC<IAgreementCard> = ({ agreement, onClick }) => {
  const classes = AgreementCardClasses()

  const dispatch = useDispatch<Dispatch<(dispatch: Dispatch<IAction>) => void>>()

  const [ mousePos, setMousePos ] = useState<{
    mouseX: number | null
    mouseY: number | null
  }>({
    mouseX: null,
    mouseY: null,
  })

  const onClickHandler = () => {
    onClick && onClick()
  }

  const removeHandler = () => {
    dispatch(removeAgreement(agreement.id))
  }

  const handleContextMenuClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setMousePos({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    })
  }

  const closeContextMenu = () => {
    setMousePos({
      mouseX: null,
      mouseY: null,
    })
  }

  const getTranslation = (translations: ITranslation[]): string => {
    const translation = translations.find((translation) => translation.language === i18n.language)

    if (translation) return translation.text
    return 'something went wrong'
  }

  return (
    <Card className={classes.card}>
      <CardActionArea
        className={classes.details}
        onClick={onClickHandler}
        disabled={mousePos.mouseY !== null}
        onContextMenu={handleContextMenuClick}
      >
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="recipe" className={classes.agreementAvatar}>
              <AgreementIcon type={agreement.type} />
            </Avatar>
          }
        />
        <CardContent className={classes.cardContent}>
          <Menu
            keepMounted
            open={mousePos.mouseY !== null}
            onClose={closeContextMenu}
            anchorReference="anchorPosition"
            anchorPosition={
              mousePos.mouseY !== null && mousePos.mouseX !== null ? (
                { top: mousePos.mouseY, left: mousePos.mouseX }
              ) : (
                undefined
              )
            }
          >
            <MenuItem onClick={removeHandler}>
              <Typography color="error">Remove agreement</Typography>
            </MenuItem>
          </Menu>
          <Typography variant="caption" color="textSecondary" gutterBottom>
            The student
          </Typography>
          <Typography variant="subtitle1">{getTranslation(agreement.translations)}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
