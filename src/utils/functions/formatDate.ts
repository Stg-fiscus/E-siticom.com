export const formatDate = (date: Date) => date.toJSON().split("T")[0];
// https://stackoverflow.com/a/18330682
export function convertUTCDateToLocalDate(utcDate: string) {
  const date = new Date(utcDate);
  // var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  // var offset = date.getTimezoneOffset() / 60;
  // var hours = date.getHours();

  // newDate.setHours(hours - offset);

  return date;
}

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString("it-IT");
};

export const formatDateTime = (date: Date) =>
  `${formatDate(date)} ${formatTime(date)}`;
