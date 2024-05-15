import React, { useEffect, useState } from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
// import dynamic from "next/dynamic";
// import { Button } from "antd";
import { Select } from "antd";
import CommentList from "@/components/ui/vendor/comment/CommentList";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import Link from "next/link";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CommentPopUp from "@/components/ui/vendor/comment/popUp/CommentPopUp";
import { Empty } from "antd";
import { Pagination } from "@mui/material";
import Cookies from "js-cookie";

function Index() {
  // states
  const token = Cookies.get("token");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [quantity, setQuantity] = useState(5);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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

  // useEffect(() => {
  //   console.log(id);
  // }, [id]);

  return (
    <>
      <Head>
        <title>Techwave - Vendor</title>
      </Head>
      <VendorLayout path="/comment">
        <div className={Styles["user-managemnent-container"]}>
          <span style={{ fontWeight: "800", fontSize: "22px" }}>
            QUẢN LÝ ĐÁNH GIÁ
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
              <Link
                href={"/vendor/comment"}
                className={Styles["user-filter-button-wrapper"]}
                style={{ height: "100%" }}
              >
                <span>Đánh giá chưa phản hồi</span>
              </Link>

              <Link
                href={"/vendor/repliedcomment"}
                className={`${Styles["user-filter-button-wrapper"]}
                   ${Styles["report-nav-active"]}`}
                style={{ height: "100%" }}
              >
                <span>Đơn hàng đã phản hồi</span>
              </Link>
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
          </div>

          <CommentList
            updateMax={updateMax}
            limit={quantity}
            page={page}
            token={token}
            status={1}
            handleOpen={handleOpen}
            updateId={updateId}
          />
          <Dialog
            fullWidth={true}
            maxWidth="md"
            open={open}
            onClose={handleClose}
          >
            <DialogContent>
              <CommentPopUp id={id} token={token} />
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
      </VendorLayout>
    </>
  );
}

export default Index;
