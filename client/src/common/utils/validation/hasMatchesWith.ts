export const hasMatchesWith = <T>(arrayOne: T[], arrayTwo: T[]): boolean => {
  if (!arrayOne || !arrayTwo) return false

  return arrayOne.some((item: T) => arrayTwo.indexOf(item) !== -1)
}
