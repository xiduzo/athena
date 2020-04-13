import { Card, CardActionArea, Menu } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { NumberOrNull } from 'src/lib/types'
import { IMousePosition } from 'src/lib/interfaces'

export interface IClickableCard {
  onLeftClick?: () => void
  onRightClickItems?: React.ReactElement
  cardContent?: JSX.Element
}

export const ClickableCard: FC<IClickableCard> = ({
  onLeftClick,
  onRightClickItems,
  cardContent,
}) => {
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

  return <Card>{onLeftClick || onRightClickItems ? renderWithAction() : cardContent}</Card>
}
