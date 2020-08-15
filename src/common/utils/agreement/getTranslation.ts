import { ITranslation } from 'src/lib/interfaces'

import i18n from 'src/i18n'

// TODO get default translations for each supported language
const defaultText: string = 'something went wrong'

export const getTranslation = (translations: ITranslation[], language?: string): string => {
  const translation = translations.find((t) => t.language === (language ?? i18n.language))

  return translation?.text ?? defaultText
}
