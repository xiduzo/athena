import { createContext, useContext } from 'react'

interface IAutContext {
  authToken?: string
  setAuthToken?: (data: any) => void
}

export const AuthContext = createContext<IAutContext>({})

export function useAuth() {
  return useContext(AuthContext)
}
