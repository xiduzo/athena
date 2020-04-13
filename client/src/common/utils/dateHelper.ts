/**
 * Simple JS Date format
 * @param date Date object
 * @param format y: year, m: month, d: day, h: hour, i: minute, s: second, M: milliseconds
 */
export const formatDate = (date: Date, format: string): string => {
  const jsonDate: string[] = date.toJSON().split(/[:/.TZ-]/)

  return format.replace(/[ymdhisM]/g, (letter: string) => {
    return jsonDate['ymdhisM'.indexOf(letter)]
  })
}
