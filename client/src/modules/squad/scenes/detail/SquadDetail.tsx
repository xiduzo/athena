import { useMutation, useQuery } from '@apollo/react-hooks'
import { Box, Container, Grid, makeStyles, MenuItem, Theme, Typography } from '@material-ui/core'
import { ApolloError } from 'apollo-errors'
import gql from 'graphql-tag'
import React, { FC, useState } from 'react'
import { useParams } from 'react-router'
import { ADD_AGREEMENT_PARENT, ADD_AGREEMENT_TRANSLATION, CREATE_AGREEMENT } from 'src/common/services/agreementService'
import { ADD_SQUAD_AGREEMENT, REMOVE_SQUAD_AGREEMENT } from 'src/common/services/squadService'
import { asyncForEach } from 'src/common/utils/asyncForEach'
import { getTranslation } from 'src/common/utils/getTranslation'
import { snackbarWrapper } from 'src/common/utils/snackbarWrapper'
import { generalCatchHandler } from 'src/common/utils/generalCatchHandler'
import { AddCard } from 'src/components/Atoms'
import { AgreementCard } from 'src/components/Molecules/AgreementCard'
import { UserCard } from 'src/components/Molecules/UserCard'
import { IAgreement, ITranslation, IUser } from 'src/lib/interfaces'
import { v4 as uuid } from 'uuid'
import { AgreementSelector } from './components/AgreementSelector'

interface ISquadDetailParams {
  id: string
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      padding: theme.spacing(2, 0),
    },
  }
})

export const SquadDetail: FC = () => {
  const { id } = useParams<ISquadDetailParams>()

  const classes = useStyles()

  const [ agreementsModalOpen, setAgreementsModalOpen ] = useState(false)

  const { loading, error, data, refetch } = useQuery(
    gql`
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
            type
            parent {
              id
            }
            translations {
              language
              text
            }
          }
        }
      }
    `,
    {
      variables: {
        id,
      },
    }
  )

  const [ AddSquadAgreements ] = useMutation(ADD_SQUAD_AGREEMENT)
  const [ RemoveSquadAgreements ] = useMutation(REMOVE_SQUAD_AGREEMENT)
  const [ AddAgreementTranslations ] = useMutation(ADD_AGREEMENT_TRANSLATION)
  const [ CreateAgreement ] = useMutation(CREATE_AGREEMENT)
  const [ AddAgreementParent ] = useMutation(ADD_AGREEMENT_PARENT)

  const toggleAgreementsModal = () => setAgreementsModalOpen(!agreementsModalOpen)

  const onAgreementsModalCloseHandler = async (agreements?: IAgreement[]) => {
    toggleAgreementsModal()

    if (!agreements) return

    await asyncForEach(agreements || [], async (agreement: IAgreement) => {
      let hasError = false
      const originalId = agreement.id
      // Overwrite agreement object
      agreement = {
        ...agreement,
        id: uuid(),
        isBase: false,
      }

      const catchError = (error: ApolloError) => {
        hasError = !hasError
        generalCatchHandler(error)
      }

      // Create new agreement object
      await CreateAgreement({
        variables: {
          ...agreement,
          type: parseInt(`${agreement.type}`, 10),
        },
      }).catch(catchError)

      // Make sure we link it to its parent
      await AddAgreementParent({
        variables: {
          from: { id: agreement.id },
          to: { id: originalId },
        },
      }).catch(catchError)

      if (!hasError) {
        // Add the translation
        await asyncForEach(agreement.translations || [], async (translation: ITranslation) => {
          await AddAgreementTranslations({
            variables: {
              id: uuid(),
              from: { id: translation.id },
              to: { id: agreement.id },
            },
          }).catch(catchError)
        })
      }

      if (!hasError) {
        await AddSquadAgreements({
          variables: {
            from: { id: id },
            to: { id: agreement.id },
          },
        })
          .then((_) => snackbarWrapper.success(`${getTranslation(agreement.translations)}->${data.Squad[0].name}`))
          .catch(generalCatchHandler)
      }
    })

    refetch()
  }

  const removeAgreementHandler = async (agreement: IAgreement) => {
    await RemoveSquadAgreements({
      variables: {
        from: { id: id },
        to: { id: agreement.id },
      },
    })
      .then((_) => snackbarWrapper.success(`Removed ${getTranslation(agreement.translations)}->${data.Squad[0].name}`))
      .catch(generalCatchHandler)

    refetch()
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
                      <MenuItem onClick={() => removeAgreementHandler(agreement)}>
                        <Typography color='error'>Remove agreement</Typography>
                      </MenuItem>
                    </Box>
                  }
                />
              </Grid>
            ))}
            <AgreementSelector
              title={`Select agreements to add to ${data.Squad[0].name}`}
              without={
                data.Squad[0].agreements.map((agreement: any) => {
                  return {
                    ...agreement,
                    id: agreement.parent.id,
                  }
                }) || []
              } // TODO: without its parent component as id
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
