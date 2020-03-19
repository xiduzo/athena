import React, { FC, useState, Fragment } from 'react'
import { Card, CardActionArea, CardHeader, Menu } from '@material-ui/core'
import { ISquad } from 'src/lib/interfaces'

interface ISquadCard {
  squad: ISquad
  onLeftClick?: () => void
  onRightClickItems?: React.ReactElement
}

type NumberOrNull = number | null

export const SquadCard: FC<ISquadCard> = ({ squad, onLeftClick, onRightClickItems }) => {
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

  const renderRightClick = () => {
    return (
      <Fragment>
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
      </Fragment>
    )
  }

  const renderOnlyRightClick = () => {
    return (
      <CardActionArea disableRipple disableTouchRipple onContextMenu={onRightClickItems && handleContextMenuClick}>
        {onRightClickItems && renderRightClick()}
        {renderWithoutAnyAction()}
      </CardActionArea>
    )
  }

  const renderOnlyLeftClick = () => {
    return <CardActionArea onClick={onLeftClick && onLeftClickHandler}>{renderWithoutAnyAction()}</CardActionArea>
  }

  const renderBothClicks = () => {
    return (
      <CardActionArea
        onClick={onLeftClick && onLeftClickHandler}
        disabled={mousePos.mouseY !== null}
        onContextMenu={onRightClickItems && handleContextMenuClick}
      >
        {onRightClickItems && renderRightClick()}
        {renderWithoutAnyAction()}
      </CardActionArea>
    )
  }

  const renderWithAction = () => {
    return (
      <Fragment>
        {onLeftClick && !onRightClickItems && renderOnlyLeftClick()}
        {!onLeftClick && onRightClickItems && renderOnlyRightClick()}
        {onLeftClick && onRightClickItems && renderBothClicks()}
      </Fragment>
    )
  }

  const renderWithoutAnyAction = () => {
    return (
      <section>
        <CardHeader avatar={'T'} title={`${squad.name}`} />
      </section>
    )
  }

  return <Card>{onLeftClick || onRightClickItems ? renderWithAction() : renderWithoutAnyAction()}</Card>
}
