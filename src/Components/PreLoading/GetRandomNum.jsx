import React from "react";

export default function GetRandomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
