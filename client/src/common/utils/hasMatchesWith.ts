export const hasMatchesWith = <T>(arrayOne: T[], arrayTwo: T[]) =>
  arrayOne.some((item: T) => arrayTwo.indexOf(item) !== -1)
