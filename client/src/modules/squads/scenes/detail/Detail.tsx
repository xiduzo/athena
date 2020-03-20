import { useQuery } from '@apollo/react-hooks'
import { Box, Container, Grid, makeStyles, MenuItem, Theme, Typography } from '@material-ui/core'
import gql from 'graphql-tag'
import React, { FC, useState } from 'react'
import { useParams } from 'react-router'
import { AddCard } from 'src/components/Atoms'
import { AgreementCard } from 'src/components/Molecules/AgreementCard'
import { UserCard } from 'src/components/Molecules/UserCard'
import { IAgreement, IUser } from 'src/lib/interfaces'
import { AgreementsSelector } from './components/AgreementSelector'

interface ISquadDetailRouteParams {
  id: string
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      padding: theme.spacing(2, 0),
    },
  }
})

export const SquadDetailRoute: FC = () => {
  const { id } = useParams<ISquadDetailRouteParams>()

  const classes = useStyles()

  const [ agreementsModalOpen, setAgreementsModalOpen ] = useState(false)

  const [ pageQuery ] = useState(gql`
    query Squad($id: String!) {
      Squad(filter: { id: $id }) {
        id
        name
        members {
          id
          displayName
        }
        agreements {
          id
          translations {
            language
            text
          }
        }
      }
    }
  `)

  const { loading, error, data, refetch } = useQuery(pageQuery, {
    variables: {
      id,
    },
  })

  const toggleAgreementsModal = () => setAgreementsModalOpen(!agreementsModalOpen)

  const onAgreementsModalCloseHandler = (agreements?: IAgreement[]) => {
    refetch()
    toggleAgreementsModal()
  }

  const removeAgreementHandler = (agreementId: string) => {
    refetch()
    // if (squad)
    // dispatch(updateSquad(squad, { agreements: squad.agreements.filter((agreement) => agreement !== agreementId) }))
  }

  return (
    <section className={classes.root}>
      <Container maxWidth='lg'>
        {loading ? (
          <div>loading</div>
        ) : error ? (
          <div>{error.message}</div>
        ) : !data.Squad.length ? (
          <div>empty state</div>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant={`h3`}>{data.Squad[0].name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={`h5`}>{`Members`}</Typography>
            </Grid>
            {data.Squad[0].members.map((user: IUser) => (
              <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
                <UserCard user={user} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Typography variant={`h5`}>{`Agreements`}</Typography>
            </Grid>
            {data.Squad[0].agreements.map((agreement: IAgreement) => (
              <Grid key={agreement.id} item xs={12} sm={6} md={4} lg={3}>
                <AgreementCard
                  agreement={agreement}
                  onRightClickItems={
                    <Box>
                      <MenuItem onClick={() => removeAgreementHandler(agreement.id)}>
                        <Typography color='error'>Remove agreement</Typography>
                      </MenuItem>
                    </Box>
                  }
                />
              </Grid>
            ))}
            <AgreementsSelector
              title={`Select agreements to add to ${data.Squad[0].name}`}
              without={data.Squad[0].agreements || []}
              isOpen={agreementsModalOpen}
              onClose={onAgreementsModalCloseHandler}
            />
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AddCard onClick={toggleAgreementsModal} />
            </Grid>
          </Grid>
        )}
      </Container>
    </section>
  )
}
