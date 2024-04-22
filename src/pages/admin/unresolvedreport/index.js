import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";
import { Roboto } from "next/font/google";
import Styles from "../styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Link from "next/link";
import ReportList from "@/components/ui/vendor/report/ReportList";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ReportDetailDialog from "@/components/ui/admin/dialog/reportDialog/ReportDetailDialog";
import { useCookies } from "react-cookie";
import { Toaster } from "react-hot-toast";
import { Pagination } from "@mui/material";
import { Select } from "antd";
import Cookies from "js-cookie";

function Index() {
  // states
  //   const [isOpenAddCateDialog, setIsOpenAddCateDialog] = useState(false);
  //   const [isOpenEditCateDialog, setIsOpenEditCaterDialog] = useState(false);
  //   const [isOpenEditImgDialog, setIsOpenEditImgDialog] = useState(false);
  //   const [avatarSrc, setAvatarSrc] = useState(images.empty);
  const [id, setId] = useState();
  const token = Cookies.get("token");
  const [quantity, setQuantity] = useState(5);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState();

  const handlingOpenAddCateDialog = () => {
    setIsOpenAddCateDialog(true);
  };

  const handlingOpen = () => {
    setOpen(true);
  };

  const handlingClose = () => {
    setOpen(false);
  };

  const updateId = (value) => {
    setId(value);
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

  const [open, setOpen] = useState(false);

  // const handlingCloseAddCateDialog = () => {
  //   setIsOpenAddCateDialog(false);
  // };

  // const handlingOpenEditCateDialog = () => {
  //   setIsOpenEditCaterDialog(true);
  // };

  // const handlingCloseEditCateDialog = () => {
  //   setIsOpenEditCaterDialog(false);
  // };

  // const handlingOpenEditImgDialog = () => {
  //   setIsOpenEditImgDialog(true);
  // };

  // const handlingCloseEditImgDialog = () => {
  //   setIsOpenEditImgDialog(false);
  // };

  return (
    <>
      <Head>
        <title>Techwave - Admin</title>
      </Head>
      <AdminLayout path="/unresolvedreport">
        <Toaster />
        <div className={Styles["user-managemnent-container"]}>
          <span style={{ fontWeight: "800", fontSize: "22px" }}>
            QUẢN LÝ BÁO CÁO CHƯA ĐƯỢC DUYỆT
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
                href={"/admin/unresolvedreport"}
                className={`${Styles["user-filter-button-wrapper"]}
                   ${Styles["report-nav-active"]}`}
                style={{ height: "100%" }}
              >
                <span>Báo cáo chưa được duyệt</span>
              </Link>

              <Link
                href={"/admin/resolvedreport"}
                className={Styles["user-filter-button-wrapper"]}
                style={{ height: "100%" }}
              >
                <span>Báo cáo đã được duyệt</span>
              </Link>
            </div>
          </div>
          <div className={Styles["markup-container"]}>
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
          <ReportList
            updateMax={updateMax}
            limit={quantity}
            page={page}
            status={0}
            updateId={updateId}
            handleOpenDialog={handlingOpen}
            token={token}
          />
          <Dialog
            fullWidth={true}
            maxWidth="md"
            open={open}
            onClose={handlingClose}
          >
            <DialogContent>
              <ReportDetailDialog id={id} />
            </DialogContent>
          </Dialog>
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
