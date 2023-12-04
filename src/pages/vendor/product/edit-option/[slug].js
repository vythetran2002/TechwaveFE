import React, { useState } from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import Head from "next/head";
import Styles from "../../styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
import dynamic from "next/dynamic";
import { Button } from "antd";
import ProductList from "@/components/ui/vendor/ProductList";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddProductDialog from "@/components/ui/vendor/dialog/addProduct/AddProductDialog";
import EditProductDialog from "@/components/ui/vendor/dialog/editProduct/EditProductDialog";
import useFetchVendorProfile from "@/api/vendor/useFetchVendorProfile";
import useFetchProductById from "@/api/products/useFetchProductById";
import { useRouter } from "next/router";
import OptionList from "@/components/ui/vendor/option/OptionList";
import AddOptionDialog from "@/components/ui/vendor/dialog/addOption/AddOptionDialog";
import { useCookies } from "react-cookie";
import { Toaster } from "react-hot-toast";
import EditOptionDialog from "@/components/ui/vendor/dialog/editOption/EditOptionDialog";
function Index() {
  const [cookies] = useCookies();
  const router = useRouter();
  const slug = router.query.slug;

  const product = useFetchProductById(slug);

  //   console.log(product);
  // states
  const [currentOption, setCurrentOption] = useState({});
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

  const updateCurrentOption = (option) => {
    let temp = { ...option };
    setCurrentOption(temp);
  };

  const updateImage = (value) => {
    let temp = { ...currentOption, image: value };
    setCurrentOption(temp);
  };

  const updateName = (value) => {
    let temp = { ...currentOption, name: value };
    setCurrentOption(temp);
  };

  //   useState(() => {
  //     console.log("sakdjsalkdjskajaskjslljasdk");
  //     console.log(currentOption);
  //   }, [currentOption]);

  if (product.isLoading) return <>Loading</>;
  if (product.isError) return <>Error</>;
  else
    return (
      <>
        <Head>
          <title>Techwave - Vendor</title>
        </Head>
        <VendorLayout path="/product">
          <Toaster />
          <div className={Styles["user-managemnent-container"]}>
            {product.data ? (
              <span
                style={{
                  fontWeight: "800",
                  fontSize: "22px",
                  textTransform: "uppercase",
                }}
              >
                QUẢN LÝ PHÂN LOẠI SẢN PHẨM: {product.data.name}
              </span>
            ) : (
              <>Loading</>
            )}

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
                onClick={setIsOpenAddProductDialog}
              >
                <AddCircleOutlineOutlinedIcon />
                <span>Thêm Phân loại</span>
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
            <OptionList
              productId={slug}
              token={cookies["token"]}
              setOption={updateCurrentOption}
              handleOpenDialog={handlingOpenEditProductDialog}
              handleCloseDialog={handlingOpenEditProductDialog}
            />
            <AddOptionDialog
              id={product.data.product_id}
              token={cookies["token"]}
              isOpen={isOpenAddProductDialog}
              handleClose={handlingCloseAddProductDialog}
            />
            <EditOptionDialog
              token={cookies["token"]}
              productId={slug}
              option={currentOption}
              updateName={updateName}
              updateImage={updateImage}
              isOpen={isOpenEditProductDialog}
              handleClose={handlingCloseEditProductDialog}
            />
          </div>
        </VendorLayout>
      </>
    );
}

export default Index;
