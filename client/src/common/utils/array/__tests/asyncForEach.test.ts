import { asyncForEach } from '../asyncForEach'

describe('Given a list of promises', () => {
  it('should wait for all promises to finish', async () => {
    // Arrange
    const expected = [true, true, true]
    // Act

    expect(
      asyncForEach(expected, async () => {
        return await new Promise<boolean>(() => {
          setTimeout(() => {
            Promise.resolve(true)
          }, 100)
        })
      })
    ).resolves.toBe(expected)
  })
})
