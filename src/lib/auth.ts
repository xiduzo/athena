import { createContext, useContext } from 'react'

interface IAutContext {
  authTokens?: string
  setAuthTokens?: (data: any) => void
}

export const AuthContext = createContext<IAutContext>({})

export function useAuth() {
  return useContext(AuthContext)
}
