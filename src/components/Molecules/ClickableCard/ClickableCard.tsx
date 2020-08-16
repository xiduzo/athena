import { Card, CardActionArea, Menu, CardProps, makeStyles, Theme } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { NumberOrNull } from 'src/lib/types'
import { IMousePosition } from 'src/lib/interfaces'
import clsx from 'clsx'

export interface IClickableCard extends CardProps {
  onLeftClick?: () => void
  onRightClickItems?: React.ReactElement
  cardContent?: JSX.Element
}

const useStyles = makeStyles((theme: Theme) => ({
  noLeftClick: {
    '& .MuiCardActionArea-focusHighlight': {
      background: `${theme.palette.background.paper} !important`,
    },
  },
}))

export const ClickableCard: FC<IClickableCard> = ({
  onLeftClick,
  onRightClickItems,
  cardContent,
}) => {
  const classes = useStyles()

  const [mousePos, setMousePos] = useState<IMousePosition>({
    x: null,
    y: null,
  })

  const setMousePosValues = (x: NumberOrNull, y: NumberOrNull): void => {
    setMousePos({ x, y })
  }

  const clearMousePos = (): void => setMousePosValues(null, null)

  const handleContextMenuClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault()
    if (mousePos.x || mousePos.y) return clearMousePos()

    const { clientX, clientY } = event

    setMousePosValues(clientX, clientY)
  }

  const onLeftClickHandler = (): void => onLeftClick && onLeftClick()

  const onRightClickHandler = (): void => clearMousePos()

  const renderRightClick = (): JSX.Element => {
    return (
      <Menu
        keepMounted
        open={mousePos.y !== null}
        onClose={onRightClickHandler}
        anchorReference='anchorPosition'
        anchorPosition={
          mousePos.y !== null && mousePos.x !== null
            ? { top: mousePos.y, left: mousePos.x }
            : undefined
        }
      >
        {onRightClickItems}
      </Menu>
    )
  }

  const renderOnlyRightClick = (): JSX.Element => {
    return (
      <CardActionArea
        disableRipple
        disableTouchRipple
        onContextMenu={onRightClickItems && handleContextMenuClick}
      >
        {onRightClickItems && renderRightClick()}
        {cardContent}
      </CardActionArea>
    )
  }

  const renderOnlyLeftClick = (): JSX.Element => {
    return (
      <CardActionArea onClick={onLeftClick && onLeftClickHandler}>{cardContent}</CardActionArea>
    )
  }

  const renderBothClicks = (): JSX.Element => {
    return (
      <CardActionArea
        onClick={onLeftClick && onLeftClickHandler}
        disabled={mousePos.y !== null}
        onContextMenu={onRightClickItems && handleContextMenuClick}
      >
        {onRightClickItems && renderRightClick()}
        {cardContent}
      </CardActionArea>
    )
  }

  const renderWithAction = (): JSX.Element => {
    if (onLeftClick && !onRightClickItems) return renderOnlyLeftClick()
    if (!onLeftClick && onRightClickItems) return renderOnlyRightClick()
    return renderBothClicks()
  }

  return (
    <Card
      className={clsx({
        [classes.noLeftClick]: !onLeftClick,
      })}
    >
      {onLeftClick || onRightClickItems ? renderWithAction() : cardContent}
    </Card>
  )
}
