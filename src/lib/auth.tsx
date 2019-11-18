import React, { FC, useState, createContext, useContext, ReactNode } from 'react'

interface IAuthContext {
  token: string
  setAuthToken: (token: string) => void
}

const AuthContext = createContext<IAuthContext>({
  token: '',
  setAuthToken: (_: string) => {},
})

const useAuthHandler = () => {
  const [token, setToken] = useState<string>('')

  const setAuthToken = (newToken: string) => {
    localStorage.setItem('token', JSON.stringify(newToken))
    setToken(newToken)
  }

  return {
    token,
    setAuthToken,
  }
}

export const useAuth = () => useContext(AuthContext)

const { Provider } = AuthContext

export const AthenaAuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { token, setAuthToken } = useAuthHandler()

  return <Provider value={{ token, setAuthToken }}> {children} </Provider>
}
