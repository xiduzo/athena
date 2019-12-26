import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'src/lib/auth'
import { useHistory } from 'react-router-dom'

export const LoginRoute: FC = () => {
  const { t } = useTranslation()
  const { token } = useAuth()
  const history = useHistory()

  useEffect(() => {
    if (token) history.push('/student/dashboard')
  }, [token, history])

  return <div>login page {t('dashboard')}</div>
}
