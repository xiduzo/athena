import React, { FC, useState, Fragment } from 'react'
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
} from '@material-ui/core'
import { AgreementIcon } from 'src/components/Atoms'
import i18n from 'src/i18n'

interface IAgreementCard {
  agreement: IAgreement
  onLeftClick?: () => void
  onRightClickItems?: React.ReactElement
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
    flexGrow: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    '&:last-child': {
      padding: theme.spacing(1),
    },
  },
}))

type NumberOrNull = number | null

export const AgreementCard: FC<IAgreementCard> = ({ agreement, onLeftClick, onRightClickItems }) => {
  const classes = AgreementCardClasses()

  const [ mousePos, setMousePos ] = useState<{
    mouseX: NumberOrNull
    mouseY: NumberOrNull
  }>({
    mouseX: null,
    mouseY: null,
  })

  const onLeftClickHandler = () => {
    onLeftClick && onLeftClick()
  }

  const setMousePosValues = (mouseX: NumberOrNull, mouseY: NumberOrNull): void => {
    setMousePos({ mouseX, mouseY })
  }

  const handleContextMenuClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const { clientX, clientY } = event

    setMousePosValues(clientX, clientY)
  }

  const onRightClickHandler = () => {
    setMousePosValues(null, null)
  }

  const getTranslation = (translations: ITranslation[]): string => {
    const translation = translations.find((translation) => translation.language === i18n.language)

    if (translation) return translation.text
    return 'something went wrong'
  }

  const renderRightClick = () => {
    return (
      <Fragment>
        <Menu
          keepMounted
          open={mousePos.mouseY !== null}
          onClose={onRightClickHandler}
          anchorReference="anchorPosition"
          anchorPosition={
            mousePos.mouseY !== null && mousePos.mouseX !== null ? (
              { top: mousePos.mouseY, left: mousePos.mouseX }
            ) : (
              undefined
            )
          }
        >
          {onRightClickItems}
        </Menu>
      </Fragment>
    )
  }

  const renderWithAction = () => {
    return (
      <Fragment>
        <CardActionArea
          onClick={onLeftClick && onLeftClickHandler}
          disabled={mousePos.mouseY !== null}
          onContextMenu={onRightClickItems && handleContextMenuClick}
        >
          {onRightClickItems && renderRightClick()}
          {renderWithoutAnyAction()}
        </CardActionArea>
      </Fragment>
    )
  }

  const renderWithoutAnyAction = () => {
    return (
      <section className={classes.details}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="recipe" className={classes.agreementAvatar}>
              <AgreementIcon type={agreement.type} />
            </Avatar>
          }
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="caption" color="textSecondary" gutterBottom>
            The student
          </Typography>
          <Typography variant="subtitle1">{getTranslation(agreement.translations)}</Typography>
        </CardContent>
      </section>
    )
  }

  return (
    <Card className={classes.card}>
      {onLeftClick || onRightClickItems ? renderWithAction() : renderWithoutAnyAction()}
    </Card>
  )
}
