import React from 'react'

export default function Num2Views(num) {
  let numString = num.toString();
  let num0 = Number(numString[0]);
  let num1 = Number(numString[1]);
  let num2 = Number(numString[2]);
  if (num < 1000) {
    return num;
  }
  if (num >= 1000 && num < 10000 && num1 > 0) {
    return `${num0}.${num1}K`;
  }
  if (num >= 1000 && num < 10000 && num1 === 0) {
    return `${num0}K`;
  }
  if (num >= 10000 && num < 100000) {
    return `${num0}${num1}K`;
  }
  if (num >= 100000 && num < 1000000) {
    return `${num0}${num1}${num2}K`;
  }
  if (num >= 1000000 && num < 10000000 && num1 > 0) {
    return `${num0}.${num1}M`;
  }
  if (num >= 1000000 && num < 10000000 && num1 === 0) {
    return `${num0}M`;
  }
  if (num >= 10000000 && num < 100000000) {
    return `${num0}${num1}M`;
  }
  if (num >= 100000000 && num < 1000000000) {
    return `${num0}${num1}${num2}M`;
  }
  if (num >= 1000000000 && num1 > 0) {
    return `${num0}.${num1}B`;
  }
  if (num >= 1000000000 && num1 === 0) {
    return `${num0}B`;
  }
}
