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
import { mutate } from "swr";

function ListItem(props) {
  const { account, handleReload } = props;

  const menuRef = useRef(null);

  const handlingOpenMenu = () => {
    menuRef.current.style.transform = "scale(1)";
  };

  const handleOpenDialog = () => {
    props.updateId(account.account_id);
    props.updateAccount(account);
    props.handleOpenDialog();
  };

  const handleSoftDelete = () => {
    const message = DeleteSoftAccount(account.account_id, props.token);
    console.log(message);
    window.location.reload();
  };

  const handleDelteAccount = () => {
    const message = DeleteAccount(account.account_id, props.token);
    console.log(message);
    // window.location.reload();
  };

  const handleOpenDetailDialog = () => {
    props.updateId(account.account_id);
    props.updateAccount(account);
    props.handleOpenDetailDialog();
  };

  const handlingActiveAccount = () => {
    const message = ActiveAccount(account.account_id, props.token);
    console.log(message);
    handleReload();
    // window.location.reload();
  };

  const handlineApproveAccount = () => {
    const message = ApproveAccount(account.account_id, props.token);
    console.log(message);
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
          {account.account_id}
        </div>
        <div className={Styles["list-item-name-wrapper"]}>
          {account.fullname}
        </div>
        <div className={Styles["list-item-email-wrapper"]}>{account.email}</div>
        <div className={Styles["list-item-dob-wrapper"]}>
          {dayjs(account.dob).format("DD/MM/YYYY")}
        </div>
        <dt className={Styles["list-item-gender-wrapper"]}>
          {/* male or female */}
          {account.gender == "Nữ" ? (
            <FemaleOutlinedIcon sx={{ color: "#db2777" }} />
          ) : (
            <MaleOutlinedIcon sx={{ color: "#0284c7" }} />
          )}
        </dt>
        <div className={Styles["list-item-role-wrapper"]}>
          {account.id_permission == 1 && <>Admin</>}
          {account.id_permission == 2 && <>Vendor</>}
          {account.id_permission == 3 && <>Customer</>}
        </div>

        <div className={Styles["list-item-status-wrapper"]}>
          {/* banned or not */}
          {account.status == 1 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div
                className={Styles["list-item-status-active-button-wrapper"]}
                style={{ backgroundColor: "#52525b" }}
                onClick={handleOpenDetailDialog}
              >
                <VisibilityIcon />
              </div>
              <div className={Styles["list-item-status-active-button-wrapper"]}>
                Active
              </div>
            </div>
          )}
          {/* banned or not */}
          {account.status == 0 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div
                className={Styles["list-item-status-active-button-wrapper"]}
                style={{ backgroundColor: "#52525b" }}
                onClick={handleOpenDetailDialog}
              >
                <VisibilityIcon />
              </div>
              <div
                className={Styles["list-item-status-banned-button-wrapper"]}
                style={{ backgroundColor: "#0284c7" }}
              >
                Pending
              </div>
            </div>
          )}
          {account.status == 2 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div
                className={Styles["list-item-status-active-button-wrapper"]}
                style={{ backgroundColor: "#52525b" }}
                onClick={handleOpenDetailDialog}
              >
                <VisibilityIcon />
              </div>
              <div
                className={Styles["list-item-status-banned-button-wrapper"]}
                style={{ backgroundColor: "#ea580c" }}
              >
                Banned
              </div>
            </div>
          )}
          <div className={Styles["list-item-more-option-wrapper"]}>
            {props.status == 1 && (
              <div
                className={Styles["list-item-option-list-container"]}
                ref={menuRef}
              >
                <>
                  <div
                    className={Styles["list-item-option-edit-user-container"]}
                    onClick={handleOpenDialog}
                  >
                    <EditIcon />
                    <span>Chỉnh sửa thông tin</span>
                  </div>

                  <div
                    className={Styles["list-item-option-edit-user-container"]}
                    onClick={handleSoftDelete}
                  >
                    <BlockOutlinedIcon sx={{ color: "#f97316" }} />
                    <span
                      style={{
                        color: "#f97316",
                      }}
                    >
                      Cấm tài khoản
                    </span>
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
                      Xoá tài khoản
                    </span>
                  </div>
                </>
              </div>
            )}
            {props.status == 0 && (
              <div
                className={Styles["list-item-option-list-container"]}
                ref={menuRef}
                style={{ bottom: "-84px" }}
              >
                <>
                  <div
                    className={Styles["list-item-option-edit-user-container"]}
                    onClick={handlineApproveAccount}
                  >
                    <CheckOutlinedIcon sx={{ color: "#16a34a" }} />
                    <span
                      style={{
                        color: "#16a34a",
                      }}
                    >
                      Duyệt tài khoản
                    </span>
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
                      Xoá tài khoản
                    </span>
                  </div>
                </>
              </div>
            )}
            {props.status == 2 && (
              <div
                className={Styles["list-item-option-list-container"]}
                ref={menuRef}
                style={{ bottom: "-84px" }}
              >
                <>
                  <div
                    className={Styles["list-item-option-edit-user-container"]}
                    onClick={handlingActiveAccount}
                  >
                    <LockOpenOutlinedIcon sx={{ color: "#16a34a" }} />
                    <span
                      style={{
                        color: "#16a34a",
                      }}
                    >
                      Mở khoá tài khoản
                    </span>
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
                      Xoá tài khoản
                    </span>
                  </div>
                </>
              </div>
            )}
            <div onClick={handlingOpenMenu}>
              <MoreVertIcon />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default ListItem;
