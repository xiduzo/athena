export const hasMatchesWith = <T>(arrayOne: T[], arrayTwo: T[]): boolean =>
  arrayOne.some((item: T) => arrayTwo.indexOf(item) !== -1)
