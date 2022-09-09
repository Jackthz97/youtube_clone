import React from "react";

export default function DurationConvert(duration) {
  const time_extractor = /^P([0-9]*D)?T([0-9]*H)?([0-9]*M)?([0-9]*S)?$/i;
  const extracted = time_extractor.exec(duration);

  let days = "";
  let hours = "";
  let minutes = "";
  let seconds = parseInt(extracted[4], 10);

  (parseInt(extracted[1], 10)) && (days = `${parseInt(extracted[1], 10)}:`);
  (parseInt(extracted[2], 10)) && (hours = `${parseInt(extracted[2], 10)}:`);
  (parseInt(extracted[3], 10)) && (minutes = `${parseInt(extracted[3], 10)}:`);
  // if (hours < 10 && hours > 0) {
  //   hours = "0" + hours;
  // }
  // if (minutes < 10 && minutes > 0) {
  //   minutes = "0" + minutes;
  // }
  // if (days < 10 && days > 0) {
  //   days = "0" + days;
  // }
  if (!seconds) {
    seconds = "00";
  }
  if (seconds < 10 && seconds > 0) {
    seconds = "0" + seconds;
  }
  if (days === "" && hours === "" && minutes === "") {
    seconds = `0:${seconds}`
  }
  return days + hours + minutes + seconds;
}
