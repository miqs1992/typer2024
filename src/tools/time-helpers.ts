export const displayDateTime = (date: Date) => {
  return Intl.DateTimeFormat("pl", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Warsaw",
  }).format(date);
};

export const displayDate = (date: Date) => {
  return Intl.DateTimeFormat("pl", {
    dateStyle: "short",
  })
    .format(date)
    .slice(0, -5);
};

export const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
};
