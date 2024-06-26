import React, { useState } from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { Select } from "antd";
import VoucherList from "@/components/ui/vendor/voucher/VoucherList";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Pagination } from "@mui/material";
import AddVoucherDialog from "@/components/ui/vendor/voucher/add/AddVoucherDialog";
import Cookies from "js-cookie";
import EditVoucherDialog from "@/components/ui/vendor/voucher/edit/EditVoucherDialog";
import useFetchVouchersVendor from "@/api/vendor/useFetchVouchersVendor";

function Index() {
  const token = Cookies.get("token");
  const [voucher, setVoucher] = useState({});
  const [quantity, setQuantity] = useState(5);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState();
  const { mutate } = useFetchVouchersVendor();

  // states
  const [isOpenAddProductDialog, setIsOpenAddProductDialog] = useState(false);
  const [isOpenEditProductDialog, setIsOpenEditProductDialog] = useState(false);
  const handlingOpenAddProductDialog = () => {
    setIsOpenAddProductDialog(true);
  };

  const handlingCloseAddProductDialog = () => {
    setIsOpenAddProductDialog(false);
  };

  const handlingOpenEditProductDialog = () => {
    setIsOpenEditProductDialog(true);
  };

  const handlingCloseEditProductDialog = () => {
    setIsOpenEditProductDialog(false);
  };

  const handlingUpdateVoucher = (value) => {
    setVoucher(value);
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
      <VendorLayout path="/vouchers">
        <div className={Styles["user-managemnent-container"]}>
          <span style={{ fontWeight: "800", fontSize: "22px" }}>
            QUẢN LÝ KHUYẾN MÃI
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
            <button
              // href={"/vendor/product/add"}
              className={Styles["user-filter-button-wrapper"]}
              onClick={handlingOpenAddProductDialog}
            >
              <AddCircleOutlineOutlinedIcon />
              <span>Thêm Khuyến Mãi</span>
            </button>
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
          <VoucherList
            updateMax={updateMax}
            limit={quantity}
            page={page}
            token={token}
            updateVoucher={handlingUpdateVoucher}
            handleOpenDialog={handlingOpenEditProductDialog}
            handleCloseDialog={handlingOpenEditProductDialog}
          />
          <AddVoucherDialog
            mutate={mutate}
            token={token}
            isOpen={isOpenAddProductDialog}
            handleClose={handlingCloseAddProductDialog}
          />
          <EditVoucherDialog
            mutate={mutate}
            voucher={voucher}
            token={token}
            isOpen={isOpenEditProductDialog}
            handleClose={handlingCloseEditProductDialog}
          />
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
