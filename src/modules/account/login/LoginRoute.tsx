import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'src/common/providers/AuthProvider'

export const LoginRoute: FC = () => {
  const { t } = useTranslation()
  const { token } = useAuth()
  const history = useHistory()

  useEffect(
    () => {
      if (token) history.push('/student/dashboard')
    },
    [ token, history ]
  )

  return <div>login page {t('dashboard')}</div>
}
