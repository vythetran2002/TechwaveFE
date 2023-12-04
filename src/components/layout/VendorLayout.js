import VendorHeader from "../global/Header/vendor/Header";
import Styles from "./styles.module.css";
import React from "react";
import VendorSidebar from "../global/Sidebar/vendor/Sidebar";

export default function VendorLayout({ path, children }) {
  return (
    <>
      <div className={Styles["layout-container"]}>
        <VendorSidebar path={path} />
        <div className={Styles["header-body-container"]}>
          <VendorHeader />
          <div className={Styles["body-container"]}>{children}</div>
        </div>
      </div>
    </>
  );
}
