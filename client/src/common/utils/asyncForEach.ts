export const asyncForEach = async (array: any[], callback: Function) => {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array)
  }
}
