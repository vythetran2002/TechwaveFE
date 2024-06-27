import React from "react";
import Styles from "./styles.module.css";
import { LoadingOutlined } from "@ant-design/icons";

function UserLoadingUI() {
  return (
    <div className={Styles["ui-container"]}>
      <LoadingOutlined className={Styles["loading-ui"]} />
    </div>
  );
}

export default UserLoadingUI;
