import React, { useEffect, useRef, useState } from "react";
import Styles from "./styles.module.css";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import { memo } from "react";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import dayjs from "dayjs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AcceptReport } from "@/api/admin/AcceptReport";

function ReportItem(props) {
  //   const menuRef = useRef(null);

  const { report } = props;
  // console.log(report);
  const handlingOpenMenu = () => {
    menuRef.current.style.transform = "scale(1)";
  };

  const handleOpenDialog = () => {
    props.updateId(report.report_id);
    props.handleOpenDialog();
  };

  const handlingAcceptReport = () => {
    const message = AcceptReport(report.report_id, props.token);
    console.log(message);
  };

  //   useEffect(() => {
  //     let handler = (e) => {
  //       if (!menuRef.current.contains(e.target)) {
  //         menuRef.current.style.transform = "scale(0)";
  //       }
  //     };
  //     document.addEventListener("mousedown", handler);

  //     return () => {
  //       document.removeEventListener("mousedown", handler);
  //     };
  //   })

  return (
    <>
      <div className={Styles["list-item-container"]}>
        <div className={Styles["list-item-id-wrapper"]}>{report.createBy}</div>
        <div className={Styles["list-item-name-wrapper"]}>
          {report.id_account_report}
        </div>

        <div className={Styles["list-item-status-wrapper"]}>
          {report.content}
        </div>
        <div className={Styles["list-item-shop-wrapper"]}>
          {dayjs(report.createAt).format("DD/MM/YYYY")}
        </div>
        {props.status == 0 && (
          <div
            className={Styles["list-item-date-wrapper"]}
            style={{
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              className={Styles["list-item-status-active-button-wrapper"]}
              style={{ backgroundColor: "#52525b" }}
              onClick={handleOpenDialog}
            >
              <VisibilityIcon />
            </div>
            <div
              onClick={handlingAcceptReport}
              className={Styles["list-item-status-active-button-wrapper"]}
            >
              Phê duyệt
            </div>
            {/* <div className={Styles["list-item-status-banned-button-wrapper"]}>
            Huỷ
          </div> */}
          </div>
        )}
        {props.status == 1 && (
          <div
            className={Styles["list-item-date-wrapper"]}
            style={{
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              className={Styles["list-item-status-active-button-wrapper"]}
              style={{ backgroundColor: "#52525b" }}
              onClick={handleOpenDialog}
            >
              <VisibilityIcon />
            </div>
            {/* <div className={Styles["list-item-status-active-button-wrapper"]}>
              Phê duyệt
            </div> */}
            {/* <div className={Styles["list-item-status-banned-button-wrapper"]}>
            Huỷ
          </div> */}
          </div>
        )}

        {/* <div className={Styles["list-item-more-option-wrapper"]}>
          <div
            className={Styles["list-item-option-list-container"]}
            ref={menuRef}
          >
            <div
              className={Styles["list-item-option-edit-user-container"]}
              onClick={handleOpenDialog}
            >
              <EditIcon />
              <span>Chỉnh sửa danh mục</span>
            </div>

            <div className={Styles["list-item-option-edit-user-container"]}>
              <DeleteOutlineOutlinedIcon sx={{ color: "#e11d48" }} />
              <span
                style={{
                  color: "#e11d48",
                }}
              >
                Xoá Danh mục
              </span>
            </div>
          </div>
          <div onClick={handlingOpenMenu}>
            <MoreVertIcon />
          </div>
        </div> */}
      </div>
    </>
  );
}

export default ReportItem;
