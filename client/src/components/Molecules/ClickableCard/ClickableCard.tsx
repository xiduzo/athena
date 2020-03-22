import { Card, CardActionArea, Menu } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { NumberOrNull } from 'src/lib/types'

export interface IClickableCard {
  onLeftClick?: () => void
  onRightClickItems?: React.ReactElement
  cardContent?: JSX.Element
}

export const ClickableCard: FC<IClickableCard> = ({ onLeftClick, onRightClickItems, cardContent }) => {
  const [ mousePos, setMousePos ] = useState<{
    mouseX: NumberOrNull
    mouseY: NumberOrNull
  }>({
    mouseX: null,
    mouseY: null,
  })

  const setMousePosValues = (mouseX: NumberOrNull, mouseY: NumberOrNull): void => {
    setMousePos({ mouseX, mouseY })
  }

  const clearMousePos = () => setMousePosValues(null, null)

  const handleContextMenuClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    if (mousePos.mouseX || mousePos.mouseY) return clearMousePos()

    const { clientX, clientY } = event

    setMousePosValues(clientX, clientY)
  }

  const onLeftClickHandler = () => onLeftClick && onLeftClick()

  const onRightClickHandler = () => {
    clearMousePos()
  }

  const renderRightClick = (): JSX.Element => {
    return (
      <Menu
        keepMounted
        open={mousePos.mouseY !== null}
        onClose={onRightClickHandler}
        anchorReference='anchorPosition'
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
    )
  }

  const renderOnlyRightClick = (): JSX.Element => {
    return (
      <CardActionArea disableRipple disableTouchRipple onContextMenu={onRightClickItems && handleContextMenuClick}>
        {onRightClickItems && renderRightClick()}
        {cardContent}
      </CardActionArea>
    )
  }

  const renderOnlyLeftClick = (): JSX.Element => {
    return <CardActionArea onClick={onLeftClick && onLeftClickHandler}>{cardContent}</CardActionArea>
  }

  const renderBothClicks = (): JSX.Element => {
    return (
      <CardActionArea
        onClick={onLeftClick && onLeftClickHandler}
        disabled={mousePos.mouseY !== null}
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

  return <Card>{onLeftClick || onRightClickItems ? renderWithAction() : cardContent}</Card>
}
