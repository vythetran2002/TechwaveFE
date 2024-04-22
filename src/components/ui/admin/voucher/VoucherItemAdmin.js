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
import { DeleteSoftAccount } from "@/api/admin/DeleteSoftAccount";
import { DeleteAccount } from "@/api/admin/DeleteAccount";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { ActiveAccount } from "@/api/admin/ActiveAccount";
import { ApproveAccount } from "@/api/admin/ApproveAccount";

function VoucherItemAdmin(props) {
  const { account } = props;

  const menuRef = useRef(null);

  const handlingOpenMenu = () => {
    menuRef.current.style.transform = "scale(1)";
  };

  const handleOpenDialog = () => {
    props.updateId(account.account_id);
    props.updateAccount(account);
    props.handleOpenDialog();
  };

  const handleOpenDetailDialog = () => {
    props.updateId(account.account_id);
    props.updateAccount(account);
    props.handleOpenDetailDialog();
  };

  const handleSoftDelete = async () => {
    const message = await DeleteSoftAccount(account.account_id, props.token);
    await props.reload();
    // window.location.reload();
  };

  const handleDelteAccount = async () => {
    const message = await DeleteAccount(account.account_id, props.token);
    await props.reload();
    // window.location.reload();
  };

  const handlingActiveAccount = async () => {
    const message = await ActiveAccount(account.account_id, props.token);
    await props.reload();
  };

  const handlineApproveAccount = async () => {
    const message = await ApproveAccount(account.account_id, props.token);
    await props.reload();
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
        <div className={Styles["list-item-id-wrapper"]}>XMAS SALE</div>
        <div className={Styles["list-item-name-wrapper"]}>20</div>
        <div className={Styles["list-item-email-wrapper"]}>50%</div>
        <div className={Styles["list-item-dob-wrapper"]}>200.000đ</div>
        <dt className={Styles["list-item-gender-wrapper"]}>50.000đ</dt>
        <div className={Styles["list-item-role-wrapper"]}>25/10/2002</div>
        <div className={Styles["list-item-status-wrapper"]}>
          <span>25/10/2002</span>

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
