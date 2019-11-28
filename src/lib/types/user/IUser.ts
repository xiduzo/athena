export enum Gender {
  MALE = 0,
  FEMALE = 1,
}

export interface IUser {
  avatar_hash: string | null
  email: string
  first_name: string
  gender: Gender
  initials: string | null
  is_staff: boolean
  is_superuser: boolean
  student_number: number
  surname: string
  surname_prefix: string | null
  id: string
}
