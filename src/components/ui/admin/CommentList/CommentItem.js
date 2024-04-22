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
import Rating from "@mui/material/Rating";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AcceptReport } from "@/api/admin/AcceptReport";
import { DeleteComment } from "@/api/admin/DeleteComment";

function CommentItemAdmin(props) {
  //   const menuRef = useRef(null);

  const { cmt, token, mutate } = props;
  // console.log(report);
  const handlingOpenMenu = () => {
    menuRef.current.style.transform = "scale(1)";
  };

  const handleOpenDialog = () => {
    props.updateId(cmt.review_id);
    props.handleOpenDialog();
  };

  const handleClickDelReview = async () => {
    // console.log(cmt.review_id);
    const message = await DeleteComment(cmt.review_id, token);
    await mutate();
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
        <div className={Styles["list-item-id-wrapper"]}>
          {cmt.account.username}
        </div>
        <div className={Styles["list-item-name-wrapper"]}>
          {cmt.product.name}
        </div>

        <div className={Styles["list-item-status-wrapper"]}>
          <Rating
            name="size-small"
            defaultValue={parseInt(cmt.rating)}
            size="medium"
            precision={0.5}
            readOnly
          />
        </div>
        <div className={Styles["list-item-shop-wrapper"]}>
          {dayjs(cmt.createAt).format("DD/MM/YYYY")}
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
              className={Styles["list-item-status-active-button-wrapper"]}
              style={{ backgroundColor: "#dc2626" }}
              onClick={handleClickDelReview}
            >
              <DeleteOutlineOutlinedIcon />
            </div>

            {/* <div
              onClick={handlingAcceptReport}
              className={Styles["list-item-status-active-button-wrapper"]}
            >
              Phê duyệt
            </div> */}
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
              style={{ backgroundColor: "#dc2626" }}
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

export default CommentItemAdmin;
