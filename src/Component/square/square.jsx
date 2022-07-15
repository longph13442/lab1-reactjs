import { useState } from "react"
import style from "./square.module.css"

const Square = ({ value, handlePlay, winner }) => {
  function setColor(value) {
    if (winner) {
      return "green"
    }
    if (value == "x") {
      return "white"
    }
    if (value == "o") {
      return "gray"
    }
  }
  return <button className={style.square} onClick={handlePlay} style={{ background: setColor(value, winner) }} >{value}</button>
}

export default Square