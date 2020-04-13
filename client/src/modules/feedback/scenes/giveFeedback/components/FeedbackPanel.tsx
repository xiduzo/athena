import {
  Box,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { Rating } from '@material-ui/lab'
import React, { FC } from 'react'
import { getTranslation, getFeedbackGivenThisWeek, getMyFeedback } from 'src/common/utils'
import { Avataaar } from 'src/components'
import { IAgreement, IFeedback, IUser } from 'src/lib/interfaces'
import { ItemsToGoIcon } from './ItemsToGoIcon'
import { useAuth } from 'src/common/providers'

const useStyles = makeStyles((theme: Theme) => ({
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    paddingLeft: theme.spacing(2),
  },
  flex: {
    display: `flex`,
  },
}))

interface IFeedbackPanel {
  agreement: IAgreement
  isCurrentWeek: boolean
  selectedWeek: number
  members: IUser[]
  callback: (
    myFeedback: IFeedback | undefined,
    value: number | null,
    user: IUser,
    agreement: IAgreement
  ) => void
}
export const FeedbackPanel: FC<IFeedbackPanel> = ({
  agreement,
  isCurrentWeek,
  selectedWeek,
  members,
  callback,
}) => {
  const classes = useStyles()
  const { userInfo } = useAuth()

  const giveFeedback = async (
    myFeedback: IFeedback | undefined,
    value: number | null,
    user: IUser,
    agreement: IAgreement
  ): Promise<void> => {
    if (!value) return
    callback(myFeedback, value, user, agreement)
  }

  const feedbackGivenThisWeek = getFeedbackGivenThisWeek(agreement, userInfo.id, selectedWeek)

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container alignItems='center'>
          <Tooltip title={`Feedback to give ${members.length - feedbackGivenThisWeek}`}>
            <Box className={classes.flex}>
              <ItemsToGoIcon max={members.length} current={feedbackGivenThisWeek} />
            </Box>
          </Tooltip>
          <Typography className={classes.title} variant='h6'>
            {getTranslation(agreement.translations)}
          </Typography>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          {members.map((user: IUser) => {
            const myFeedback = getMyFeedback(agreement, selectedWeek, user)

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
                  // disabled={!isCurrentWeek}
                  max={4}
                  name={`${user.id}-${agreement.id}`}
                  size='large'
                  value={myFeedback ? myFeedback.rating : null}
                  precision={0.5}
                  onChange={(_: React.ChangeEvent<{}>, value: number | null) =>
                    giveFeedback(myFeedback, value, user, agreement)
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
