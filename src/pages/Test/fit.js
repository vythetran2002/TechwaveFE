import React from "react";
import Styles from "./test.module.css";
import { Textfit } from "react-textfit";

function reactTextFit() {
  return (
    <div className={Styles.containerTest}>
      <Textfit mode="multi">ABC</Textfit>
    </div>
  );
}

export default reactTextFit;
