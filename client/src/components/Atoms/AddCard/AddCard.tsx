import { Card, CardActionArea, CardContent, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import React, { FC } from 'react'

interface IAddCard {
  onClick: () => void
}

export const AddCard: FC<IAddCard> = ({ onClick }) => {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Grid container justify='center' alignItems='center'>
            <AddIcon />
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
