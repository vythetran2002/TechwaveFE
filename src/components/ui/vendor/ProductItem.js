import React, { useEffect, useRef, useState } from "react";
import Styles from "./styles.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Image from "next/image";
import images from "@/assets/images";
import dayjs from "dayjs";
import InfoIcon from "@mui/icons-material/Info";
import Link from "next/link";
import { DeleteProduct } from "@/api/vendor/DeleteProduct";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import { Tooltip, Image as AntdImg } from "antd";

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

  const handleDelete = async () => {
    const message = await DeleteProduct(props.product.product_id, props.token);
    await props.mutate();
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
          <Tooltip title={props.product.name}>{props.product.name}</Tooltip>
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
            <AntdImg
              src={props.product.image}
              width={140}
              height={140}
              alt=""
              priority
            />
          ) : (
            <AntdImg
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
        <div
          className={Styles["list-item-gender-wrapper"]}
          style={{ marginRight: "10px" }}
        >
          <Tooltip title={props.product.category.name}>
            <div className={Styles["list-item-status-active-button-wrapper"]}>
              {props.product.category.name}
            </div>
          </Tooltip>
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
