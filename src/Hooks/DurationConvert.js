import React from "react";

export default function DurationConvert(duration) {
  const time_extractor = /^P([0-9]*D)?T([0-9]*H)?([0-9]*M)?([0-9]*S)?$/i;
    const extracted = time_extractor.exec(duration);
    if (extracted) {
        let days = `${parseInt(extracted[1], 10)}:` || "";
        let hours = `${parseInt(extracted[2], 10)}:` || "";
        let minutes = `${parseInt(extracted[3], 10)}` || "";
        let seconds = parseInt(extracted[4], 10) || "";
        if (days < 10 && days !== 0) {
          
        }

        return `${days}${hours}${minutes}${seconds}`;
    }
    return 0;
}
