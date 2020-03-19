import { ITranslation } from 'src/lib/interfaces'

import i18n from 'src/i18n'

export const getTranslation = (translations: ITranslation[]): string => {
  const translation = translations.find((translation) => translation.language === i18n.language)

  if (translation) return translation.text
  return 'something went wrong'
}
