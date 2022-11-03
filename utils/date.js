export const getFormattedDate = (date) => {
  const month =
    date.getMonth().toString().length === 2
      ? date.getMonth() + 1
      : `0${date.getMonth() + 1}`;
  const day =
    date.getDate().toString().length === 2
      ? date.getDate()
      : `0${date.getDate()}`;
  return `${date.getFullYear()}-${month}-${day}`;
};

export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
