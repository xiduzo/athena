import IGuid from '../IGuid'

export interface IUser extends IGuid {
  name: string
  surname: string
  is_staff: boolean
}

export interface IStudent extends IUser {
  studentNumber: number
}

export interface ILecturer extends IUser {
  is_superuser: boolean
}
