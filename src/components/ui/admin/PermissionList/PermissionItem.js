import React, { useEffect, useRef, useState } from "react";
import Styles from "./styles.module.css";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";

function PermissionItem(props) {
  return (
    <>
      <div className={Styles["list-item-container"]}>
        <div className={Styles["list-item-id-wrapper"]}>{props.name}</div>
        {props.roles &&
          props.roles.map((role, index) => {
            return <React.Fragment key={"role" + index}>{role}</React.Fragment>;
          })}
      </div>
    </>
  );
}

export default PermissionItem;
