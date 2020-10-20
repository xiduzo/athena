import { useMutation, useQuery } from '@apollo/react-hooks'
import { Box, Container, Grid, makeStyles, MenuItem, Theme, Typography } from '@material-ui/core'
import { ApolloError } from 'apollo-errors'
import gql from 'graphql-tag'
import React, { FC, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import {
  ADD_AGREEMENT_PARENT,
  ADD_AGREEMENT_TRANSLATION,
  ADD_SQUAD_AGREEMENT,
  ADD_SQUAD_MEMBER,
  CREATE_AGREEMENT,
  REMOVE_SQUAD_AGREEMENT,
  REMOVE_SQUAD_MEMBER,
} from 'src/common/services'
import {
  asyncForEach,
  generalCatchHandler,
  getTranslation,
  snackbarWrapper,
} from 'src/common/utils'
import {
  AddCard,
  AgreementCard,
  AgreementSelector,
  UserCard,
  UserSelector,
  Show,
  FeedbackPointsGraph,
  FeedbackSpiderGraph,
} from 'src/components'
import { IAgreement, ITranslation, IUser } from 'src/lib/interfaces'
import { v4 as uuid } from 'uuid'
import { UserRole } from 'src/lib/enums'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  const classes = useStyles()
  const history = useHistory()

  const [agreementsModalOpen, setAgreementsModalOpen] = useState(false)
  const [usersModalOpen, setUsersModalOpen] = useState(false)

  const { loading, error, data, refetch } = useQuery(
    gql`
      query Squad($id: String!) {
        Squad(filter: { id: $id }) {
          id
          name
          members {
            id
            displayName
            avatarStyle
          }
          agreements {
            id
            points
            type
            feedback {
              from {
                id
              }
              to {
                id
              }
              rating
              weekNum
            }
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

  const [AddSquadAgreements] = useMutation(ADD_SQUAD_AGREEMENT)
  const [RemoveSquadAgreements] = useMutation(REMOVE_SQUAD_AGREEMENT)
  const [AddAgreementTranslations] = useMutation(ADD_AGREEMENT_TRANSLATION)
  const [CreateAgreement] = useMutation(CREATE_AGREEMENT)
  const [AddAgreementParent] = useMutation(ADD_AGREEMENT_PARENT)
  const [AddSquadMembers] = useMutation(ADD_SQUAD_MEMBER)
  const [RemoveSquadMembers] = useMutation(REMOVE_SQUAD_MEMBER)

  const toggleUsersModal = () => setUsersModalOpen(!usersModalOpen)

  const onUserModalCloseHandler = async (users?: IUser[]): Promise<void> => {
    toggleUsersModal()

    if (!users) return

    let hasError: boolean = false

    const catchError = (error: ApolloError) => {
      hasError = !hasError
      generalCatchHandler(error)
    }

    await asyncForEach(users, async (user: IUser) => {
      await AddSquadMembers({
        variables: {
          from: {
            id: user.id,
          },
          to: {
            id: id,
          },
        },
      })
        .then(() => snackbarWrapper.success(`${user.displayName}->${data.Squad[0].name}`))
        .catch(catchError)
    })

    refetch()
  }

  const removeSquadMemberHandler = async (user: IUser): Promise<void> => {
    await RemoveSquadMembers({
      variables: {
        from: { id: user.id },
        to: { id: id },
      },
    })
      .then((_) => snackbarWrapper.success(`Removed ${user.displayName}->${data.Squad[0].name}`))
      .catch(generalCatchHandler)

    refetch()
  }

  const navigateToUser = (user: IUser): void => history.push(`/user/${user.id}`)

  const toggleAgreementsModal = (): void => setAgreementsModalOpen(!agreementsModalOpen)

  const onAgreementsModalCloseHandler = async (agreements?: IAgreement[]): Promise<void> => {
    toggleAgreementsModal()

    if (!agreements) return

    await asyncForEach(
      agreements,
      async (agreement: IAgreement): Promise<void> => {
        let hasError = false
        const originalId = agreement.id
        // Overwrite agreement object
        agreement = {
          ...agreement,
          id: uuid(),
          isBase: false,
        }

        const catchError = (error: ApolloError): void => {
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
                from: { id: agreement.id },
                to: { id: translation.id },
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
            .then((_) =>
              snackbarWrapper.success(
                `${getTranslation(agreement.translations)}->${data.Squad[0].name}`
              )
            )
            .catch(generalCatchHandler)
        }
      }
    )

    refetch()
  }

  const removeAgreementHandler = async (agreement: IAgreement): Promise<void> => {
    await RemoveSquadAgreements({
      variables: {
        from: { id: id },
        to: { id: agreement.id },
      },
    })
      .then((_) =>
        snackbarWrapper.success(
          `Removed ${getTranslation(agreement.translations)}->${data.Squad[0].name}`
        )
      )
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
                <UserCard
                  user={user}
                  onLeftClick={() => navigateToUser(user)}
                  onRightClickItems={
                    <Box>
                      <MenuItem onClick={() => removeSquadMemberHandler(user)}>
                        <Typography color='error'>{t('remove')}</Typography>
                      </MenuItem>
                    </Box>
                  }
                />
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <UserSelector
                title={t('users')}
                subtitle={data.Squad[0].name}
                without={data.Squad[0].members}
                isOpen={usersModalOpen}
                onClose={onUserModalCloseHandler}
              />
              <Show forGroups={[UserRole.Admin, UserRole.Leader]}>
                <AddCard onClick={toggleUsersModal} />
              </Show>
            </Grid>
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
                        <Typography color='error'>{t('remove')}</Typography>
                      </MenuItem>
                    </Box>
                  }
                />
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AgreementSelector
                title={t('agreements')}
                subtitle={data.Squad[0].name}
                without={
                  data.Squad[0].agreements
                    .filter((agreement: IAgreement) => agreement.parent !== null)
                    .map((agreement: any) => {
                      return {
                        ...agreement,
                        id: agreement.parent.id,
                      }
                    }) || []
                } // TODO: without its parent component as id
                isOpen={agreementsModalOpen}
                onClose={onAgreementsModalCloseHandler}
              />
              <Show forGroups={[UserRole.Admin, UserRole.Leader]}>
                <AddCard onClick={toggleAgreementsModal} />
              </Show>
            </Grid>
            <Show forGroups={[UserRole.Admin, UserRole.Leader]}>
              <Grid item xs={12}>
                <Typography variant='h6' component='h2'>
                  Feedback
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <FeedbackPointsGraph agreements={data.Squad[0].agreements} />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeedbackSpiderGraph agreements={data.Squad[0].agreements} />
              </Grid>
            </Show>
          </Grid>
        )}
      </Container>
    </section>
  )
}
