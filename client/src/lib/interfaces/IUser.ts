import { IEntityBase } from './IEntityBase'

export interface IUser extends IEntityBase {
  email: string
  displayName: string
  avatarHash: string
  identityProviderReferenceNumber: string
}
