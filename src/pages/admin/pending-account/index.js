import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
import dynamic from "next/dynamic";
import { Select } from "antd";
import ItemList from "@/components/ui/admin/ItemList/ItemList";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddUserDialog from "@/components/ui/admin/dialog/addUser/AddUserDialog";
import EditUserDialog from "@/components/ui/admin/dialog/editUser/EditUserDialog";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { Toaster } from "react-hot-toast";
import DetailUserDialog from "@/components/ui/admin/dialog/detailUser/DetailUserDialog";
import { Pagination } from "@mui/material";

function Index() {
  // states
  const [cookies] = useCookies(["token"]);
  const [isOpenAddUserDialog, setIsOpenAddUserDialog] = useState(false);
  const [isOpenEditUserDialog, setIsOpenEditUserDialog] = useState(false);
  const [isOpenDetailUserDialog, setIsOpenDetailUserDialog] = useState(false);
  const [id, setId] = useState();
  const [quantity, setQuantity] = useState(5);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState();
  const [account, setAccount] = useState();
  const updateId = (value) => {
    setId(value);
  };

  const updateAccount = (value) => {
    let temp = { ...value };
    setAccount(temp);
  };
  const handlingOpenAddUserDialog = () => {
    setIsOpenAddUserDialog(true);
  };

  const handlingCloseAddUserDialog = () => {
    setIsOpenAddUserDialog(false);
  };

  const handlingOpenEditUserDialog = () => {
    setIsOpenEditUserDialog(true);
  };

  const handlingCloseEditUserDialog = () => {
    setIsOpenEditUserDialog(false);
  };

  const handlingOpenDetailUserDialog = () => {
    setIsOpenDetailUserDialog(true);
  };

  const handlingCloseDetailUserDialog = () => {
    setIsOpenDetailUserDialog(false);
  };

  const updateQuantity = (value) => {
    setQuantity(value);
  };

  const handlePaging = async (value, pageSize) => {
    await setPage(pageSize);
  };

  const updateMax = (value) => {
    setMax(value);
  };

  // if (account.isLoading) return <>Loading</>;
  // if (account.isError) return <>Error</>;
  // else
  return (
    <>
      <Head>
        <title>Techwave - Admin</title>
      </Head>
      <AdminLayout path="/account">
        <Toaster />

        <div className={Styles["user-managemnent-container"]}>
          <span style={{ fontWeight: "800", fontSize: "22px" }}>
            QUẢN LÝ USERS
          </span>
          <div className={Styles["user-search-add-container"]}>
            <div className={Styles["user-search-filter-container"]}>
              <div className={Styles["user-search-input-wrapper"]}>
                <SearchIcon />
                <input
                  style={{ backgroundColor: "white", color: "black" }}
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
            <div className={Styles["report-nav-container"]}>
              <Link
                href={"/admin/account"}
                className={Styles["user-filter-button-wrapper"]}
                style={{ height: "100%" }}
              >
                <span>Tài khoản Active</span>
              </Link>

              <Link
                href={"/admin/banned-account"}
                className={`${Styles["user-filter-button-wrapper"]}
                   ${Styles["report-nav-active"]}`}
                style={{ height: "100%" }}
              >
                <span>Tài khoản chờ duyệt</span>
              </Link>
              <Link
                href={"/admin/banned-account"}
                className={Styles["user-filter-button-wrapper"]}
                style={{ height: "100%" }}
              >
                <span>Tài khoản bị cấm</span>
              </Link>
              {/* <Link
                href={"/vendor/cancledorder"}
                className={Styles["user-filter-button-wrapper"]}
                style={{ height: "100%" }}
              >
                <span>Đơn hàng yêu cầu huỷ</span>
              </Link> */}
            </div>
          </div>
          <div
            className={Styles["markup-container"]}
            style={{
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              {/* <div className={Styles["markup-item"]}>
                <span>Foundation</span>
                <ClearOutlinedIcon className={Styles["markup-icon"]} />
              </div>
              <div className={Styles["markup-item"]}>
                <span>HaTHH</span>
                <ClearOutlinedIcon className={Styles["markup-icon"]} />
              </div> */}
              <Select
                onChange={updateQuantity}
                defaultValue={quantity}
                style={{ width: 100 }}
                options={[
                  { value: 1, label: "1" },
                  { value: 2, label: "2" },
                  { value: 3, label: "3" },
                  { value: 4, label: "4" },
                  { value: 5, label: "5" },
                  { value: 6, label: "6" },
                  { value: 7, label: "7" },
                ]}
              />
            </div>

            {/* <div
              className={Styles["user-filter-button-wrapper"]}
              onClick={setIsOpenAddUserDialog}
            >
              <AddCircleOutlineOutlinedIcon />
              <span>Thêm tài khoản</span>
            </div> */}
          </div>
          <ItemList
            updateMax={updateMax}
            limit={quantity}
            page={page}
            token={cookies["token"]}
            updateAccount={updateAccount}
            updateId={updateId}
            status={0}
            handleOpenDialog={handlingOpenEditUserDialog}
            handleCloseDialog={handlingOpenEditUserDialog}
            handleOpenDetailDialog={handlingOpenDetailUserDialog}
          />
          <AddUserDialog
            isOpen={isOpenAddUserDialog}
            handleClose={handlingCloseAddUserDialog}
          />
          <EditUserDialog
            isOpen={isOpenEditUserDialog}
            handleClose={handlingCloseEditUserDialog}
          />
          <DetailUserDialog
            token={cookies["token"]}
            data={account}
            updateData={updateAccount}
            id={id}
            isOpen={isOpenDetailUserDialog}
            handleClose={handlingCloseDetailUserDialog}
          />
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {page && (
              <Pagination onChange={handlePaging} count={max} size="large" />
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default Index;
