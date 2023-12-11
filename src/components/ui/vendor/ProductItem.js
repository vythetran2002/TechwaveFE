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
import { DeleteProduct } from "@/api/vendor/DeleteProduct";
import { FormatPrice } from "@/assets/utils/PriceFormat";

function ProductItem(props) {
  const menuRef = useRef(null);

  const handlingOpenMenu = () => {
    menuRef.current.style.transform = "scale(1)";
  };

  const handleOpenDialog = () => {
    let temp = { ...props.product };
    props.updateProduct(temp);
    props.handleOpenDialog();
  };

  const handleDelete = () => {
    const message = DeleteProduct(props.product.product_id, props.token);
    console.log(message);
    // window.location.reload();
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
          {props.product.name}
        </div>
        <div className={Styles["list-item-name-wrapper"]}>
          {" "}
          {props.product.quantity}
        </div>
        <div className={Styles["list-item-email-wrapper"]}>
          {" "}
          {FormatPrice(props.product.price)}
        </div>
        <div
          className={Styles["list-item-email-wrapper"]}
          style={{ color: "green" }}
        >
          {FormatPrice(props.product.promotional_price)}
        </div>
        <div className={Styles["list-item-dob-wrapper"]}>
          {props.product.image != null ? (
            <Image
              src={props.product.image}
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
        <div className={Styles["list-item-status-wrapper"]}>
          {dayjs(props.product.createAt).format("DD/MM/YYYY")}
        </div>
        <div className={Styles["list-item-gender-wrapper"]}>
          <div className={Styles["list-item-status-active-button-wrapper"]}>
            {props.product.category_id}
          </div>
        </div>
        <div className={Styles["list-item-more-option-wrapper"]}>
          <div
            className={Styles["list-item-option-list-container"]}
            ref={menuRef}
          >
            <Link
              style={{ color: "black" }}
              href={"/vendor/product/detail/" + props.product.product_id}
              className={Styles["list-item-option-edit-user-container"]}
            >
              <InfoIcon />
              <span>Xem chi tiết</span>
            </Link>
            <div
              className={Styles["list-item-option-edit-user-container"]}
              onClick={handleOpenDialog}
            >
              <EditIcon />
              <span>Chỉnh sửa Sản phẩm</span>
            </div>

            <div
              className={Styles["list-item-option-edit-user-container"]}
              onClick={handleDelete}
            >
              <DeleteOutlineOutlinedIcon sx={{ color: "#e11d48" }} />
              <span
                style={{
                  color: "#e11d48",
                }}
              >
                Xoá Sản phẩm
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

export default ProductItem;
