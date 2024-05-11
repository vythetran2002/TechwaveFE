import React, { useEffect, useRef, useState } from "react";
import Styles from "./styles.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import dayjs from "dayjs";
import { DeleteAccount } from "@/api/admin/DeleteAccount";
import { Tooltip } from "antd";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import { compareDates } from "@/assets/utils/validateDayRemain";
import { calculateRemainingDays } from "@/assets/utils/calculateDayRemain";
import { DeleteVoucherAdmin } from "@/api/admin/DeleteVoucherAdmin";

function VoucherItemAdmin(props) {
  const { data } = props;
  const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
  const menuRef = useRef(null);

  const handlingOpenMenu = () => {
    menuRef.current.style.transform = "scale(1)";
  };

  const handleOpenDialog = () => {
    // props.up(account.account_id);
    props.updateVoucher(data);
    props.handleOpenDialog();
  };

  const handleDelteAccount = async () => {
    const message = await DeleteVoucherAdmin(data.discount_id, props.token);
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
  }, []);

  return (
    <>
      <div className={Styles["list-item-container"]}>
        <div className={Styles["list-item-id-wrapper"]}>
          <Tooltip title={props.data.name}>{props.data.name}</Tooltip>
        </div>
        <div className={Styles["list-item-name-wrapper"]}>
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
        <div className={Styles["list-item-status-wrapper"]}>
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

          <div className={Styles["list-item-more-option-wrapper"]}>
            <div
              className={Styles["list-item-option-list-container"]}
              ref={menuRef}
            >
              <div>
                <div
                  className={Styles["list-item-option-edit-user-container"]}
                  onClick={handleOpenDialog}
                >
                  <EditIcon />
                  <span>Chỉnh sửa khuyến mãi</span>
                </div>

                <div
                  className={Styles["list-item-option-edit-user-container"]}
                  onClick={handleDelteAccount}
                >
                  <DeleteOutlineOutlinedIcon sx={{ color: "#e11d48" }} />
                  <span
                    style={{
                      color: "#e11d48",
                    }}
                  >
                    Xoá khuyến mãi
                  </span>
                </div>
              </div>
            </div>

            <div onClick={handlingOpenMenu}>
              <MoreVertIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VoucherItemAdmin;
