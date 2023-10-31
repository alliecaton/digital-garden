export const formatDate = (date: string) => {
  const jsDate = new Date(date)

  return jsDate.toLocaleDateString()
}
