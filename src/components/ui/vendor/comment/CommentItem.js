import React, { useEffect, useRef, useState } from "react";
import Styles from "./styles.module.css";
import dayjs from "dayjs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Tooltip } from "antd";

function CommentItem(props) {
  //   const menuRef = useRef(null);
  const { comment, status } = props;

  // const handlingOpenMenu = () => {
  //   menuRef.current.style.transform = "scale(1)";
  // };

  const handleOpenDialog = () => {
    props.updateId(comment.review_id);
    props.handleOpenDialog();
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

  return (
    <>
      <div className={Styles["list-item-container"]}>
        <div className={Styles["list-item-id-wrapper"]}>
          {comment.account.username}
        </div>
        <div className={Styles["list-item-name-wrapper"]}>
          <Tooltip title={comment.product.name}>
            {" "}
            {comment.product.name}
          </Tooltip>
        </div>

        <div className={Styles["list-item-status-wrapper"]}>
          <Tooltip title={comment.content}> {comment.content}</Tooltip>
        </div>
        <div className={Styles["list-item-shop-wrapper"]}>
          {dayjs(comment.createAt).format("DD/MM/YYYY")}
        </div>
        {status == 1 && (
          <div
            className={Styles["list-item-date-wrapper"]}
            style={{
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* <div
            className={Styles["list-item-status-active-button-wrapper"]}
            style={{ backgroundColor: "#6b7280" }}
            onClick={handleOpenDialog}
          >
            <VisibilityIcon />
          </div> */}
            <div
              onClick={handleOpenDialog}
              className={Styles["list-item-status-active-button-wrapper"]}
              style={{ backgroundColor: "#475569" }}
            >
              <VisibilityIcon />
            </div>
            {/* <div className={Styles["list-item-status-banned-button-wrapper"]}>
            Huỷ
          </div> */}
          </div>
        )}
        {status == 0 && (
          <div
            className={Styles["list-item-date-wrapper"]}
            style={{
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* <div
            className={Styles["list-item-status-active-button-wrapper"]}
            style={{ backgroundColor: "#6b7280" }}
            onClick={handleOpenDialog}
          >
            <VisibilityIcon />
          </div> */}
            <div
              onClick={handleOpenDialog}
              className={Styles["list-item-status-active-button-wrapper"]}
            >
              Phản hồi
            </div>
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

export default CommentItem;
