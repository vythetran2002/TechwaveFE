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
import Link from "next/link";
import { DeleteOption } from "@/api/vendor/DeleteOption";

function OptionItem(props) {
  const menuRef = useRef(null);

  const handlingOpenMenu = () => {
    menuRef.current.style.transform = "scale(1)";
  };

  const handlingDelete = () => {
    const message = DeleteOption(
      props.productId,
      props.option.option_id,
      props.token
    );
    console.log(message);
    window.location.reload();
  };

  const handleOpenDialog = () => {
    let temp = {
      id: props.option.option_id,
      image: props.option.image,
      name: props.option.name,
    };

    props.setOption(temp);
    props.handleOpenDialog();
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
        <div className={Styles["list-item-id-wrapper"]}>
          {props.option.option_id}
        </div>

        <div className={Styles["list-item-dob-wrapper"]}>
          {props.option.image != null ? (
            <Image
              src={props.option.image}
              width={140}
              height={140}
              alt=""
              priority
            />
          ) : (
            <Image
              src={images.nonImg}
              width={140}
              height={140}
              alt=""
              priority
            />
          )}
        </div>

        <div className={Styles["list-item-gender-wrapper"]}>
          {props.option.name}
        </div>
        <div className={Styles["list-item-more-option-wrapper"]}>
          <div
            className={Styles["list-item-option-list-container"]}
            ref={menuRef}
          >
            {/* <div
              style={{ color: "black" }}
              className={Styles["list-item-option-edit-user-container"]}
            >
              <InfoIcon />
              <span>Xem chi tiết</span>
            </div> */}
            <div
              className={Styles["list-item-option-edit-user-container"]}
              onClick={handleOpenDialog}
            >
              <EditIcon />
              <span>Chỉnh sửa Phân loại</span>
            </div>

            <div
              className={Styles["list-item-option-edit-user-container"]}
              onClick={handlingDelete}
            >
              <DeleteOutlineOutlinedIcon sx={{ color: "#e11d48" }} />
              <span
                style={{
                  color: "#e11d48",
                }}
              >
                Xoá Phân loại
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

export default OptionItem;
