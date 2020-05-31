export const asyncForEach = async <T>(array: T[], callback: Function): Promise<any> => {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array)
  }
}
