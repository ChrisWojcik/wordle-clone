export function daysBetweenTwoDates(startDate, endDate) {
  const startDateAtMidnight = startDate.setHours(0, 0, 0, 0);
  const endDateAtMidnight = endDate.setHours(0, 0, 0, 0);
  const msInADay = 24 * 60 * 60 * 1000;

  return Math.round((endDateAtMidnight - startDateAtMidnight) / msInADay);
}
