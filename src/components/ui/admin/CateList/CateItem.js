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
import dayjs from "dayjs";
import InfoIcon from "@mui/icons-material/Info";
import { DeleteCategory } from "@/api/admin/DeleteCategory";

function CateItem(props) {
  const menuRef = useRef(null);
  const { cate } = props;

  const handlingOpenMenu = () => {
    menuRef.current.style.transform = "scale(1)";
  };

  const handleOpenDialog = () => {
    props.updateCate(cate);
    props.handleOpenDialog();
  };
  const handleOpenDetailDialog = () => {
    props.updateId(cate.category_id);
    props.handleOpenDetailDialog();
  };

  const handleDeleteCate = () => {
    const message = DeleteCategory(cate.category_id, props.token);
    console.log(message);
    window.location.reload();
  };

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        menuRef.current.style.transform = "scale(0)";
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <div className={Styles["list-item-container"]}>
        <div className={Styles["list-item-id-wrapper"]}>{cate.category_id}</div>
        <div className={Styles["list-item-name-wrapper"]}>{cate.name}</div>
        <div className={Styles["list-item-email-wrapper"]}>
          {/* <div className={Styles["list-item-status-wrapper"]}>
            {props.parentCate && (
              <div className={Styles["list-item-status-active-button-wrapper"]}>
                {props.parentCate}
              </div>
            )}
          </div> */}
          {cate.image != null ? (
            <Image src={cate.image} width={150} height={150} priority alt="" />
          ) : (
            <Image
              src={images.nonImg}
              width={150}
              height={150}
              priority
              alt=""
            />
          )}
        </div>
        <div className={Styles["list-item-status-wrapper"]}>
          {cate.createAt ? (
            <>{dayjs(cate.createAt).format("DD/MM/YYYY")}</>
          ) : (
            <></>
          )}
        </div>
        <div className={Styles["list-item-more-option-wrapper"]}>
          <div
            className={Styles["list-item-option-list-container"]}
            ref={menuRef}
          >
            <div
              className={Styles["list-item-option-edit-user-container"]}
              onClick={handleOpenDetailDialog}
            >
              <InfoIcon />
              <span>Xem chi tiết danh mục</span>
            </div>

            <div
              className={Styles["list-item-option-edit-user-container"]}
              onClick={handleOpenDialog}
            >
              <EditIcon />
              <span>Chỉnh sửa danh mục</span>
            </div>

            <div
              className={Styles["list-item-option-edit-user-container"]}
              onClick={handleDeleteCate}
            >
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
        </div>
      </div>
    </>
  );
}

export default CateItem;
