import React, { useState } from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
// import dynamic from "next/dynamic";
// import { Button } from "antd";
import { Badge } from "antd";
import CancledOrderList from "@/components/ui/vendor/order/cancledOrder/CancledOrderList";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
// import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
// import AddCateDialog from "@/components/ui/admin/dialog/addCate/AddCateDialog";
// import EditCateDialog from "@/components/ui/admin/dialog/editCate/EditUserDialog";
// import EditImageDialog from "@/components/ui/EditImageDialog/EditImageDialog";
// import images from "@/assets/images";
import Link from "next/link";
function Index() {
  // states
  //   const [isOpenAddCateDialog, setIsOpenAddCateDialog] = useState(false);
  //   const [isOpenEditCateDialog, setIsOpenEditCaterDialog] = useState(false);
  //   const [isOpenEditImgDialog, setIsOpenEditImgDialog] = useState(false);
  //   const [avatarSrc, setAvatarSrc] = useState(images.empty);

  const handlingOpenAddCateDialog = () => {
    setIsOpenAddCateDialog(true);
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

  return (
    <>
      <Head>
        <title>Techwave - Vendor</title>
      </Head>
      <VendorLayout path="/order">
        <div className={Styles["user-managemnent-container"]}>
          <span style={{ fontWeight: "800", fontSize: "22px" }}>
            QUẢN LÝ ĐƠN HÀNG YÊU CẦU HUỶ
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
            <div className={Styles["report-nav-container"]}>
              <Badge count={2}>
                <Link
                  href={"/vendor/pendingorder"}
                  className={Styles["user-filter-button-wrapper"]}
                  style={{ height: "100%" }}
                >
                  <span>Đơn hàng chưa được duyệt</span>
                </Link>
              </Badge>
              <Badge count={2}>
                <Link
                  href={"/vendor/shippedorder"}
                  className={Styles["user-filter-button-wrapper"]}
                  style={{ height: "100%" }}
                >
                  <span>Đơn hàng đã được duyệt</span>
                </Link>
              </Badge>
              <Badge count={1}>
                <Link
                  href={"/vendor/cancledorder"}
                  className={`${Styles["user-filter-button-wrapper"]}
                   ${Styles["report-nav-active"]}`}
                  style={{ height: "100%" }}
                >
                  <span>Đơn hàng yêu cầu huỷ</span>
                </Link>
              </Badge>
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

          <CancledOrderList />
        </div>
      </VendorLayout>
    </>
  );
}

export default Index;
