import {
  format,
  formatDistanceStrict
  // distanceInWordsToNow,
  //  distanceInWords
} from 'date-fns';
// const en = require('date-fns/locale/en');

const formatValues = {
  default: 'dd/MM/yyyy',
  defaultHour: 'dd/MM/yyyy HH:mm',
  logs: 'MMM dd, yyyy HH:mm:ss',
  inputFormat: 'yyyy-MM-dd',
  mdy: 'MMM dd, yyyy',
  mmdy: 'MMMM dd, yyyy'
};

const defaultDateInputFormat = {
  default: 'YYYY-MM-DD',
  defaultHour: 'YYYY-MM-DD HH:mm'
};

const inWordsByTime = {
  default: 'MMMM D GGGG',
  month: 'MMMM GGGG',
  year: 'GGGG',
  day: 'MMMM D GGGG'
};

export const dateFormatDistance = (startDate, endDate) =>
  formatDistanceStrict(startDate, endDate);

export const dateToEpoch = value => {
  // const newDate = new Date(value)
  return parseInt(new Date(value).getTime());
};

export const dateFormatting = (value, formatKey) => {
  console.log(new Date(value), "MY DATE IS OK")
  return format(value, formatValues[formatKey || 'default']);
};

export const assignedDate = (value, formatKey) => {
  const date = new Date(value);
  return format(date, formatValues[formatKey || 'default']);
};

export const projectHistoryDate = (value, formatKey, empName) => {
  const date = new Date(value);
  console.log(new Date(value), "MY DATE IS OK")
  return `${empName} <br/> ${format(value, formatValues[formatKey || 'default'])} - ${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
};

//Added this to display the date in the Field with input type date
export const dateInputTypeFormatting = (value, formatKey) =>
  format(parseInt(value), defaultDateInputFormat[formatKey || 'default']);

export const dateInWords = (date, formatKey) => {
  const input = new Date(date);
  return format(input, inWordsByTime[formatKey || 'default']);
};

export const numberWithCommas = (x) => {
  
  return x ? `₱${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00` : '';
}
