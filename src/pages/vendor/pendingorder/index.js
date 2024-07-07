import React, { useEffect, useState } from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { Select } from "antd";
import OrderList from "@/components/ui/vendor/order/OrderList";
import FilterListIcon from "@mui/icons-material/FilterList";
import toast, { Toaster } from "react-hot-toast";
import { Pagination } from "@mui/material";
import Link from "next/link";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Cookies from "js-cookie";
import OrderPreview from "@/components/ui/vendor/order/preview-dialog/OrderPreview";

function Index() {
  const token = Cookies.get("token");
  // console.log(pendingOrders);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState({});
  const [quantity, setQuantity] = useState(5);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handlingUpdateOrder = (value) => {
    let temp = { ...value };
    setOrder(temp);
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

  return (
    <>
      <Head>
        <title>Techwave - Vendor</title>
      </Head>
      <VendorLayout path="/order">
        <Toaster />
        <div className={Styles["user-managemnent-container"]}>
          <span style={{ fontWeight: "800", fontSize: "22px" }}>
            QUẢN LÝ ĐƠN HÀNG CHƯA ĐƯỢC DUYỆT
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
                href={"/vendor/pendingorder"}
                className={`${Styles["user-filter-button-wrapper"]}
                   ${Styles["report-nav-active"]}`}
                style={{ height: "100%" }}
              >
                <span>Đơn hàng chưa được duyệt</span>
              </Link>

              <Link
                href={"/vendor/shippedorder"}
                className={Styles["user-filter-button-wrapper"]}
                style={{ height: "100%" }}
              >
                <span>Đơn hàng đã được duyệt</span>
              </Link>

              <Link
                href={"/vendor/successorder"}
                className={Styles["user-filter-button-wrapper"]}
                style={{ height: "100%" }}
              >
                <span>Đơn hàng thành công</span>
              </Link>

              <Link
                href={"/vendor/cancledorder"}
                className={Styles["user-filter-button-wrapper"]}
                style={{ height: "100%" }}
              >
                <span>Đơn hàng bị huỷ</span>
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

          <OrderList
            updateMax={updateMax}
            limit={quantity}
            page={page}
            token={token}
            status={0}
            updateOrder={handlingUpdateOrder}
            handleOpen={handleOpen}
          />
          <Dialog
            fullWidth={true}
            maxWidth="md"
            open={open}
            onClose={handleClose}
          >
            <DialogContent>
              <OrderPreview order={order} status={0} />
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
