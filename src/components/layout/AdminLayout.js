import AdminHeader from "../global/Header/admin/Header";
import Styles from "./styles.module.css";
import React from "react";
import AdminSidebar from "../global/Sidebar/admin/Sidebar";

export default function AdminLayout({ path, children }) {
  return (
    <>
      <div className={Styles["layout-container"]}>
        <AdminSidebar path={path} />
        <div className={Styles["header-body-container"]}>
          <AdminHeader />
          <div className={Styles["body-container"]}>{children}</div>
        </div>
      </div>
    </>
  );
}
