import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
// import dynamic from "next/dynamic";
// import { Button } from "antd";
import { Badge } from "antd";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
// import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
// import AddCateDialog from "@/components/ui/admin/dialog/addCate/AddCateDialog";
// import EditCateDialog from "@/components/ui/admin/dialog/editCate/EditUserDialog";
// import EditImageDialog from "@/components/ui/EditImageDialog/EditImageDialog";
// import images from "@/assets/images";
import Link from "next/link";
import ReportList from "@/components/ui/vendor/report/ReportList";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ReportDetailDialog from "@/components/ui/admin/dialog/reportDialog/ReportDetailDialog";
import { Pagination } from "@mui/material";
import { Select } from "antd";
import Cookies from "js-cookie";

function Index() {
  // states
  //   const [isOpenAddCateDialog, setIsOpenAddCateDialog] = useState(false);
  //   const [isOpenEditCateDialog, setIsOpenEditCaterDialog] = useState(false);
  //   const [isOpenEditImgDialog, setIsOpenEditImgDialog] = useState(false);
  //   const [avatarSrc, setAvatarSrc] = useState(images.empty);

  const handlingOpenAddCateDialog = () => {
    setIsOpenAddCateDialog(true);
  };

  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const token = Cookies.get("token");
  const [quantity, setQuantity] = useState(5);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState();

  const handlingOpen = () => {
    setOpen(true);
  };

  const handlingClose = () => {
    setOpen(false);
  };

  const updateId = (value) => {
    setId(value);
  };

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

  const updateQuantity = (value) => {
    setQuantity(value);
  };

  const handlePaging = async (value, pageSize) => {
    await setPage(pageSize);
  };

  const updateMax = (value) => {
    setMax(value);
  };

  return (
    <>
      <Head>
        <title>Techwave - Admin</title>
      </Head>
      <AdminLayout path="/unresolvedreport">
        <div className={Styles["user-managemnent-container"]}>
          <span style={{ fontWeight: "800", fontSize: "22px" }}>
            BÁO CÁO ĐÃ ĐƯỢC DUYỆT
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
                className={Styles["user-filter-button-wrapper"]}
                style={{ height: "100%" }}
              >
                <span>Báo cáo chưa được duyệt</span>
              </Link>

              <Link
                href={"/admin/resolvedreport"}
                className={`${Styles["user-filter-button-wrapper"]}
                   ${Styles["report-nav-active"]}`}
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
            token={token}
            updateMax={updateMax}
            limit={quantity}
            page={page}
            status={1}
            updateId={updateId}
            handleOpenDialog={handlingOpen}
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
