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
import VisibilityIcon from "@mui/icons-material/Visibility";
import dayjs from "dayjs";
import { AcceptOrder } from "@/api/vendor/AcceptOrder";
import { RejectOrder } from "@/api/vendor/RejectOrder";
import { FormatPrice } from "@/assets/utils/PriceFormat";

function OrderItem(props) {
  const { order } = props;

  console.log(order);

  //   const menuRef = useRef(null);

  const handlingOpenMenu = () => {
    menuRef.current.style.transform = "scale(1)";
  };

  const handleOpenDialog = () => {
    props.handleOpenDialog();
  };

  const handlingAccept = () => {
    const message = AcceptOrder(order.bill_id, props.token);
    console.log(message);
  };

  const handlingReject = () => {
    const message = RejectOrder(order.bill_id, props.token);
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
  //   });

  const handlingUpdateOrder = () => {
    props.updateOrder(order);
    props.handleOpen();
  };

  return (
    <>
      <div className={Styles["list-item-container"]}>
        <div className={Styles["list-item-id-wrapper"]}>{order.fullname}</div>
        <div className={Styles["list-item-name-wrapper"]}>{order.phone}</div>

        <div
          className={Styles["list-item-gender-wrapper"]}
          style={{ justifyContent: "center" }}
        >
          {order.address}
        </div>
        <div className={Styles["list-item-shop-wrapper"]}>
          {order.cart_id.option ? (
            <>
              <div className={Styles["list-product-name-container"]}>
                {order.cart_id.option.name}
              </div>
            </>
          ) : (
            <>
              <div className={Styles["list-product-name-container"]}>
                {order.cart_id.product.name}
              </div>
            </>
          )}
        </div>
        <div
          className={Styles["list-item-date-wrapper"]}
          style={{ width: "10%" }}
        >
          {FormatPrice(order.totalBill)}
        </div>
        <div className={Styles["list-item-gender-wrapper"]}>
          {dayjs(order.createAt).format("DD/MM/YYYY")}
        </div>

        {props.mode == 1 && (
          <div
            className={Styles["list-item-date-wrapper"]}
            style={{ width: "15%", flexDirection: "column", gap: "10px" }}
          >
            <div
              className={Styles["list-item-status-watch-button-wrapper"]}
              onClick={handlingUpdateOrder}
            >
              <VisibilityIcon />
            </div>
            <div className={Styles["list-item-status-active-button-wrapper"]}>
              Đã duyệt
            </div>
          </div>
        )}

        {props.mode == 0 && (
          <div
            className={Styles["list-item-date-wrapper"]}
            style={{
              flexDirection: "column",
              gap: "10px",
              width: "15%",
            }}
          >
            <div
              className={Styles["list-item-status-watch-button-wrapper"]}
              onClick={handlingUpdateOrder}
            >
              <VisibilityIcon />
            </div>
            <div
              className={Styles["list-item-status-active-button-wrapper"]}
              onClick={handlingAccept}
            >
              Duyệt
            </div>
            <div
              className={Styles["list-item-status-banned-button-wrapper"]}
              onClick={handlingReject}
            >
              Từ chối
            </div>
          </div>
        )}

        {props.mode == 3 && (
          <div
            className={Styles["list-item-date-wrapper"]}
            style={{
              flexDirection: "column",
              gap: "10px",
              width: "15%",
            }}
          >
            <div
              className={Styles["list-item-status-watch-button-wrapper"]}
              onClick={handlingUpdateOrder}
            >
              <VisibilityIcon />
            </div>
            {/* <div
              className={Styles["list-item-status-active-button-wrapper"]}
              onClick={handlingAccept}
            >
              Duyệt
            </div>
            <div
              className={Styles["list-item-status-banned-button-wrapper"]}
              onClick={handlingReject}
            >
              Từ chối
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

export default OrderItem;
