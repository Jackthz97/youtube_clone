import React from "react";

export default function DurationConvert(string) {
  if (string.includes("H") && string.includes("M") && string.includes("S")) {
    const [te, t1] = string.split("PT");
    let [hour, rest] = t1.split("H");
    if (Number(hour) < 10) {
      hour = `0${hour}`;
    }
    let [minute, re] = rest.split("M");
    if (Number(minute) < 10) {
      minute = `0${minute}`;
    }
    let [second, ts] = re.split("S");
    if (Number(second) < 10) {
      second = `0${second}`;
    }
    return `${hour}:${minute}:${second}`;
  }
  if (string.includes("M") && string.includes("S") && !string.includes("H")) {
    const [te, t1] = string.split("PT");
    let [min, rest] = t1.split("M");
    if (Number(min) < 10) {
      min = `0${min}`;
    }
    let [sec, re] = rest.split("S");
    if (Number(sec) < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec}`;
  }
  if (!string.includes("H") && !string.includes("M") && string.includes("S")) {
    const [te, t1] = string.split("PT");
    let [sec, rest] = t1.split("S");
    if (Number(sec) < 10) {
      sec = `0${sec}`;
    }
    return `0:${sec}`;
  }
}
