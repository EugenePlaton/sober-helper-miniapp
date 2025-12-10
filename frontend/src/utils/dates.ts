export const differenceInCalendarDays = (dateLeft: Date, dateRight: Date): number => {
  const startOfLeft = new Date(Date.UTC(dateLeft.getFullYear(), dateLeft.getMonth(), dateLeft.getDate()))
  const startOfRight = new Date(Date.UTC(dateRight.getFullYear(), dateRight.getMonth(), dateRight.getDate()))
  const diff = startOfLeft.getTime() - startOfRight.getTime()
  return Math.round(diff / (1000 * 60 * 60 * 24))
}
