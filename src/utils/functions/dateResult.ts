export const DateResult = ({ date }: { date: string }): string => {
  const currentDate = new Date();
  const secondDate = new Date(date);

  const yearDifference = currentDate.getFullYear() - secondDate.getFullYear();
  const monthDifference = currentDate.getMonth() - secondDate.getMonth();
  const dayDifference = currentDate.getDate() - secondDate.getDate();
  const hourDifference = currentDate.getHours() - secondDate.getHours();
  const minuteDifference = currentDate.getMinutes() - secondDate.getMinutes();
  const secondDifference = currentDate.getSeconds() - secondDate.getSeconds();

  const timeUnits = [
    {
      unit: "жилийн өмнө",
      value: yearDifference,
    },
    {
      unit: "сарын өмнө",
      value: monthDifference,
    },
    {
      unit: "хоногийн өмнө",
      value: dayDifference,
    },
    {
      unit: "цагийн өмнө",
      value: hourDifference,
    },
    {
      unit: "минутын өмнө",
      value: minuteDifference,
    },
    {
      unit: "секундын өмнө",
      value: secondDifference,
    },
  ];

  // Filter out units with zero or negative values
  const nonZeroUnits = timeUnits.filter(({ value }) => value > 0);
  const highestNonZeroUnit = nonZeroUnits.length > 0 ? nonZeroUnits[0] : null;

  let formattedTime;

  if (
    highestNonZeroUnit &&
    highestNonZeroUnit.unit === "жилийн өмнө" &&
    (yearDifference < 1 || (yearDifference === 1 && monthDifference < 0))
  ) {
    // If the time difference is less than 1 year, show in terms of months or days
    formattedTime =
      monthDifference > 0
        ? `${monthDifference} сарын өмнө`
        : dayDifference > 0
          ? `${dayDifference} хоногийн өмнө`
          : "1 хоногийн өмнө"; // Default to 1 day if the difference is less than a day
  } else {
    formattedTime = highestNonZeroUnit
      ? `${highestNonZeroUnit.value} ${highestNonZeroUnit.unit}`
      : "No time difference";
  }

  return formattedTime;
};
