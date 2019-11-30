import React, { FC, useEffect, useState } from 'react'
import { IUser } from 'src/lib/types/user'
import { useParams } from 'react-router'
import { GetUserById } from 'src/lib/api'

interface IUserDetailRouteParams {
  id: string
}

export const UserDetailRoute: FC = () => {
  const [user, setUser] = useState<IUser>()

  const { id } = useParams<IUserDetailRouteParams>()

  useEffect(() => {
    GetUserById(id)
      .then((response: IUser) => setUser(response))
      .catch(error => console.log(error))
  }, [id])
  return <div>{user && user.first_name}</div>
}
