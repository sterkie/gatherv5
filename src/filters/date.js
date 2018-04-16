import moment from "moment";

export const monthday = value => {
  return moment(value).format("MMMM Do");
};

export const shortdate = value => {
  return moment(value).format("dddd MMMM Do");
};

export const showMonth = value => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  if (!value) return;
  for (let i = 1; i <= 12; i++) {
    if (value === i) {
      return months[i - 1];
    }
  }
};
