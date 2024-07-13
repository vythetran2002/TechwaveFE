import React from "react";
import Styles from "./styles.module.css";
import { LoadingOutlined } from "@ant-design/icons";

function FullScreenLoader() {
  return (
    <div className={Styles["container"]}>
      <LoadingOutlined className={Styles["loading"]} />
    </div>
  );
}

export default FullScreenLoader;
