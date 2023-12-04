import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
import dynamic from "next/dynamic";
import { Button } from "antd";
import ItemList from "@/components/ui/admin/ItemList/ItemList";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddUserDialog from "@/components/ui/admin/dialog/addUser/AddUserDialog";
import EditUserDialog from "@/components/ui/admin/dialog/editCate/EditCateDialog";
function Index() {
  // states
  const [isOpenAddUserDialog, setIsOpenAddUserDialog] = useState(false);
  const [isOpenEditUserDialog, setIsOpenEditUserDialog] = useState(false);
  const handlingOpenAddUserDialog = () => {
    console.log("aaa");
    setIsOpenAddUserDialog(true);
  };

  const handlingCloseAddUserDialog = () => {
    setIsOpenAddUserDialog(false);
  };

  const handlingOpenEditUserDialog = () => {
    console.log("aaa");
    setIsOpenEditUserDialog(true);
  };

  const handlingCloseEditUserDialog = () => {
    setIsOpenEditUserDialog(false);
  };

  return (
    <>
      <Head>
        <title>Techwave - Admin</title>
      </Head>
      <AdminLayout path="/vendor">
        <div className={Styles["user-managemnent-container"]}>
          <span style={{ fontWeight: "800", fontSize: "22px" }}>
            QUẢN LÝ VENDORS
          </span>
          <div className={Styles["user-search-add-container"]}>
            <div className={Styles["user-search-filter-container"]}>
              <div className={Styles["user-search-input-wrapper"]}>
                <SearchIcon />
                <input
                  placeholder="search by ..."
                  className={Styles["user-search-input"]}
                ></input>
              </div>
              <button className={Styles["user-filter-button-wrapper"]}>
                <FilterListIcon />
                <span
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Filter
                </span>
              </button>
            </div>
            <div
              className={Styles["user-filter-button-wrapper"]}
              onClick={setIsOpenAddUserDialog}
            >
              <AddCircleOutlineOutlinedIcon />
              <span>Thêm vendor</span>
            </div>
          </div>
          <div className={Styles["markup-container"]}>
            <div className={Styles["markup-item"]}>
              <span>Foundation</span>
              <ClearOutlinedIcon className={Styles["markup-icon"]} />
            </div>
            <div className={Styles["markup-item"]}>
              <span>HaTHH</span>
              <ClearOutlinedIcon className={Styles["markup-icon"]} />
            </div>
          </div>
          <ItemList
            handleOpenDialog={handlingOpenEditUserDialog}
            handleCloseDialog={handlingOpenEditUserDialog}
          />
          <AddUserDialog
            isOpen={isOpenAddUserDialog}
            handleClose={handlingCloseAddUserDialog}
          />
          <EditUserDialog
            isOpen={isOpenEditUserDialog}
            handleClose={handlingCloseEditUserDialog}
          />
        </div>
      </AdminLayout>
    </>
  );
}

export default Index;
