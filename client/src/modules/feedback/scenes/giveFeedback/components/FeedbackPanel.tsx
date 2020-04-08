import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Tooltip,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { Rating } from '@material-ui/lab'
import React, { FC } from 'react'
import { getTranslation } from 'src/common/utils'
import { Avataaar } from 'src/components'
import { IAgreement, IUser } from 'src/lib/interfaces'
import { ItemsToGoIcon } from './ItemsToGoIcon'

const useStyles = makeStyles((theme: Theme) => ({
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    paddingLeft: theme.spacing(2),
  },
}))

interface IFeedbackPanel {
  agreement: IAgreement
  isCurrentWeek: boolean
  selectedWeek: number
  members: IUser[]
}
export const FeedbackPanel: FC<IFeedbackPanel> = ({
  agreement,
  isCurrentWeek,
  selectedWeek,
  members,
}) => {
  const classes = useStyles()

  console.log(agreement)
  return (
    <ExpansionPanel disabled={!isCurrentWeek}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container alignItems='center'>
          <Tooltip title={`Feedback to give ${members.length - 0}`}>
            <ItemsToGoIcon max={members.length} current={0} />
          </Tooltip>
          <Typography className={classes.title} variant='h6'>
            {getTranslation(agreement.translations)}
          </Typography>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          {members.map((user: IUser) => {
            // TODO: move this to utils
            const myFeedback = agreement.feedback.find((feedback) => {
              return (
                feedback.to.id === user.id &&
                feedback.weekNum === selectedWeek &&
                feedback.agreement.id === agreement.id
              )
            })
            console.log(myFeedback)

            return (
              <Grid
                key={`${agreement.id}-${user.id}`}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className={classes.center}
              >
                <Avataaar
                  user={user}
                  avatar={{
                    style: { width: '75px', height: '75px' },
                  }}
                />
                <Typography variant='subtitle1'>{user.displayName}</Typography>

                <Rating
                  disabled={!isCurrentWeek}
                  max={4}
                  name='pristine'
                  size='large'
                  value={myFeedback ? myFeedback.rating : null}
                  precision={0.5}
                  onChange={(_: React.ChangeEvent<{}>, value: number | null) =>
                    //  giveFeedback(myFeedback, value, user, agreement)
                    console.log(value)
                  }
                  emptyIcon={
                    !isCurrentWeek ? (
                      <StarIcon fontSize={`inherit`} />
                    ) : (
                      <StarBorderIcon fontSize={`inherit`} />
                    )
                  }
                />
              </Grid>
            )
          })}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}
