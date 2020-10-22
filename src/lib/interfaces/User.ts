import { EntityBase } from './EntityBase'
import { ISquad } from './Squad'

export interface IUser extends EntityBase {
  email: string
  displayName: string
  avatarStyle: string
  identityProviderReferenceNumber: string
  squads: ISquad[]
}
