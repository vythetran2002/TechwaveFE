import React, { useState } from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
import dynamic from "next/dynamic";
import { Select } from "antd";
import ProductList from "@/components/ui/vendor/ProductList";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddProductDialog from "@/components/ui/vendor/dialog/addProduct/AddProductDialog";
import EditProductDialog from "@/components/ui/vendor/dialog/editProduct/EditProductDialog";
import useFetchVendorProfile from "@/api/vendor/useFetchVendorProfile";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { Pagination } from "@mui/material";

function Index() {
  const [cookies] = useCookies();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(5);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState();
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

  const handlingUpdateProduct = (value) => {
    setProduct(value);
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
      <VendorLayout path="/product">
        <div className={Styles["user-managemnent-container"]}>
          <span style={{ fontWeight: "800", fontSize: "22px" }}>
            QUẢN LÝ SẢN PHẨM
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
              onClick={setIsOpenAddProductDialog}
            >
              <AddCircleOutlineOutlinedIcon />
              <span>Thêm Sản phẩm</span>
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
          <ProductList
            updateMax={updateMax}
            limit={quantity}
            page={page}
            token={cookies["token"]}
            updateProduct={handlingUpdateProduct}
            handleOpenDialog={handlingOpenEditProductDialog}
            handleCloseDialog={handlingOpenEditProductDialog}
          />
          <AddProductDialog
            token={cookies["token"]}
            isOpen={isOpenAddProductDialog}
            handleClose={handlingCloseAddProductDialog}
          />
          <EditProductDialog
            updateProduct={handlingUpdateProduct}
            product={product}
            token={cookies["token"]}
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
