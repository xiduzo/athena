import { IEntityBase } from './IEntityBase'
import { ISquad } from './ISquad'

export interface IUser extends IEntityBase {
  email: string
  displayName: string
  avatarStyle: string
  identityProviderReferenceNumber: string
  squads: ISquad[]
}
