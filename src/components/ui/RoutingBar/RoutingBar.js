import React from "react";
import Styles from "./style.module.css";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

function RoutingBar() {
  return (
    <>
      <div className={Styles["routing-bar-container"]}>
        <div className={Styles["routing-bar-wrapper"]}>
          <span className={Styles["link"]}>
            <HomeIcon />
          </span>
          /
          <Link className={Styles["link"]} href="/">
            Sản phẩm{" "}
          </Link>{" "}
          /
          <Link className={Styles["link"]} href="/">
            Ổ cứng di động HHD cao cấp
          </Link>
          /
          <Link className={Styles["link"]} href="/">
            Mẫu máy tính 10
          </Link>
        </div>
      </div>
    </>
  );
}

export default RoutingBar;
