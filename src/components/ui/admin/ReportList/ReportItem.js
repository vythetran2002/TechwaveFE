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
import Image from "next/image";
import images from "@/assets/images";
import VisibilityIcon from "@mui/icons-material/Visibility";

function ReportItem(props) {
  //   const menuRef = useRef(null);

  const handlingOpenMenu = () => {
    menuRef.current.style.transform = "scale(1)";
  };

  console.log(props.report);

  const handleOpenDialog = () => {
    props.handleOpen(true);
    props.updateReport(props.report);
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
  //   });

  if (props.report == null) {
    return <>Error</>;
  } else
    return (
      <>
        <div className={Styles["list-item-container"]}>
          <div className={Styles["list-item-id-wrapper"]}>
            {props.report.report_id}
          </div>
          <div className={Styles["list-item-name-wrapper"]}>
            {props.report.content}
          </div>

          <div className={Styles["list-item-status-wrapper"]}>
            {" "}
            {props.report.account_report.username}
          </div>
          <div className={Styles["list-item-shop-wrapper"]}>
            {props.report.account_report.avatar != null ? (
              <Image
                src={props.report.account_report.avatar}
                alt=""
                width={100}
                height={100}
                priority
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <Image
                src={images.nonAvatar}
                alt=""
                width={100}
                height={100}
                style={{ borderRadius: "50%" }}
                priority
              />
            )}
          </div>
          <div className={Styles["list-item-date-wrapper"]}>
            {props.report.createAt ? <>props.report.createAt</> : <></>}
          </div>
          {props.report.status ? (
            props.report.status == 0 ? (
              <>
                <div className={Styles["list-item-action-wrapper"]}>
                  <div
                    className={Styles["list-item-status-active-button-wrapper"]}
                    style={{ backgroundColor: "#71717a" }}
                    onClick={handleOpenDialog}
                  >
                    <VisibilityIcon />
                  </div>
                  <div
                    style={{ backgroundColor: "#dc2626" }}
                    className={Styles["list-item-status-active-button-wrapper"]}
                  >
                    Đang xử lý
                  </div>
                </div>
              </>
            ) : (
              <div className={Styles["list-item-action-wrapper"]}>
                <div
                  className={Styles["list-item-status-active-button-wrapper"]}
                  style={{ backgroundColor: "#71717a" }}
                  onClick={handleOpenDialog}
                >
                  <VisibilityIcon />
                </div>
                <div
                  className={Styles["list-item-status-active-button-wrapper"]}
                >
                  Đã duyệt
                </div>
              </div>
            )
          ) : (
            <>
              <div className={Styles["list-item-action-wrapper"]}>
                <div
                  className={Styles["list-item-status-banned-button-wrapper"]}
                >
                  Đang xử lý
                </div>
              </div>
            </>
          )}
          {/* {props.mode ? (
            <div className={Styles["list-item-action-wrapper"]}>
              <div className={Styles["list-item-status-active-button-wrapper"]}>
                Đã duyệt
              </div>
            </div>
          ) : (
            <div className={Styles["list-item-action-wrapper"]}>
              <div className={Styles["list-item-status-active-button-wrapper"]}>
                Duyệt
              </div>
              <div className={Styles["list-item-status-banned-button-wrapper"]}>
                Huỷ
              </div>
            </div>
          )} */}

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
