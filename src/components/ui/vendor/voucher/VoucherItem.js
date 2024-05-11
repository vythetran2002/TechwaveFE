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
import { Tooltip } from "antd";
import { compareDates } from "@/assets/utils/validateDayRemain";
import { calculateRemainingDays } from "@/assets/utils/calculateDayRemain";
import { DeleteVoucherVendor } from "@/api/vendor/deleteVoucherVendor";

function VoucherItem(props) {
  const menuRef = useRef(null);

  const now = dayjs().format("YYYY-MM-DD HH:mm:ss");

  const handlingOpenMenu = () => {
    menuRef.current.style.transform = "scale(1)";
  };

  const handleOpenDialog = () => {
    let temp = { ...props.data };
    props.updateVoucher(temp);
    props.handleOpenDialog();
  };

  const handleDelete = async () => {
    const message = await DeleteVoucherVendor(
      props.data.discount_id,
      props.token
    );
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
          <Tooltip title={props.data.name}>{props.data.name}</Tooltip>
        </div>
        <div className={Styles["list-item-name-wrapper"]}>
          {" "}
          {props.data.quantity}
        </div>
        <div className={Styles["list-item-email-wrapper"]}>
          {props.data.discount}%
        </div>
        <div
          className={Styles["list-item-email-wrapper"]}
          style={{ color: "green" }}
        >
          {FormatPrice(props.data.minPrice)}
        </div>
        <div className={Styles["list-item-dob-wrapper"]}>
          {FormatPrice(props.data.mdPrice)}
        </div>
        <div className={Styles["list-item-status-wrapper"]}>
          {dayjs(props.data.expires).format("DD/MM/YYYY")}
        </div>
        {compareDates(now, props.data.expires) ? (
          <Tooltip title={calculateRemainingDays(now, props.data.expires)}>
            <div
              onClick={handleOpenDialog}
              className={Styles["list-item-status-active-button-wrapper"]}
            >
              {calculateRemainingDays(now, props.data.expires)}
            </div>
          </Tooltip>
        ) : (
          <Tooltip title={calculateRemainingDays(now, props.data.expires)}>
            <div
              onClick={handleOpenDialog}
              style={{ background: "red" }}
              className={Styles["list-item-status-active-button-wrapper"]}
            >
              {calculateRemainingDays(now, props.data.expires)}
            </div>
          </Tooltip>
        )}
        {/* <div
          onClick={handleOpenDialog}
          className={Styles["list-item-status-active-button-wrapper"]}
        >
          Phản hồi
        </div> */}
        <div className={Styles["list-item-more-option-wrapper"]}>
          <div
            className={Styles["list-item-option-list-container"]}
            ref={menuRef}
          >
            {/* <Link
              style={{ color: "black" }}
              href={"/vendor/product/detail/" + props.product.product_id}
              className={Styles["list-item-option-edit-user-container"]}
            >
              <InfoIcon />
              <span>Xem chi tiết</span>
            </Link> */}
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
                Xoá Khuyến Mãi
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

export default VoucherItem;
