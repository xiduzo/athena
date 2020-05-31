import { ITranslation } from 'src/lib/interfaces'
import { getTranslation } from '../getTranslation'

describe('Given an translations array', () => {
  describe('While empty', () => {
    it('should give a warning text', () => {
      // Arrange
      const expected = 'something went wrong'
      const translations: ITranslation[] = []

      // Act
      const received = getTranslation(translations)

      // Assert
      expect(received).toBe(expected)
    })
  })
  describe('While not empty', () => {
    it('should give to error text while not in browser', () => {
      // Arrange
      const expected = 'something went wrong'
      const translations: ITranslation[] = [
        {
          id: '1234',
          language: 'en',
          text: 'this is a sample text',
        },
      ]

      // Act
      const received = getTranslation(translations)

      // Assert
      expect(received).toBe(expected)
    })
    it('should give to correct translation for the given language', () => {
      // Arrange
      const expected = 'this is a sample text'
      const translations: ITranslation[] = [
        {
          id: '1234',
          language: 'en',
          text: 'this is a sample text',
        },
      ]

      // Act
      const received = getTranslation(translations, 'en')

      // Assert
      expect(received).toBe(expected)
    })
  })
})
