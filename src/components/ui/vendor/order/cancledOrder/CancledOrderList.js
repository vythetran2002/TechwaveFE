import React from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import ReportItem from "./CancledOrderItem";
import { Pagination } from "@mui/material";
import CancledOrderItem from "./CancledOrderItem";

function CancledOrderList(props) {
  return (
    <>
      <div className={Styles["item-list-container"]}>
        <div className={Styles["item-list-heading-container"]}>
          <div className={Styles["id-wrapper"]}>
            <span className={Styles["head-title"]}>Tài khoản</span>
            <SortOutlinedIcon />
          </div>
          <div className={Styles["fullname-wrapper"]}>
            <span className={Styles["head-title"]}>Sản phẩm</span>
          </div>
          <div className={Styles["email-wrapper"]}>
            <span className={Styles["head-title"]}>Nội dung</span>
          </div>
          <div className={Styles["dob-wrapper"]}>
            <span className={Styles["head-title"]}>Ngày đặt</span>
          </div>
          <div className={Styles["gender-wrapper"]}>
            <span className={Styles["head-title"]}>Tổng hoá đơn</span>
            <SortOutlinedIcon />
          </div>
          <div className={Styles["status-wrapper"]}>
            <span className={Styles["head-title"]}>Hành động</span>
          </div>
        </div>

        <CancledOrderItem />
        <CancledOrderItem />
        <CancledOrderItem />
        <CancledOrderItem />
        <CancledOrderItem />
      </div>
      <div className={Styles["item-pagination-container"]}>
        <Pagination count={2} size="large" />
      </div>
    </>
  );
}

export default CancledOrderList;
