export function compareDates(currentDay, goalDay) {
  const currentDatetime = new Date(currentDay);
  const goalDatetime = new Date(goalDay);

  return currentDatetime < goalDatetime;
}
