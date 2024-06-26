import React, { useState } from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import Head from "next/head";
import Styles from "../../styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import useFetchProductById from "@/api/products/useFetchProductById";
import { useRouter } from "next/router";
import OptionList from "@/components/ui/vendor/option/OptionList";
import AddOptionDialog from "@/components/ui/vendor/dialog/addOption/AddOptionDialog";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import Cookies from "js-cookie";
import EditOptionDialog from "@/components/ui/vendor/dialog/editOption/EditOptionDialog";
import useFetchOptionByProductId from "@/api/vendor/useFetchOptionByProductId";

function Index() {
  const token = Cookies.get("token");
  const router = useRouter();
  const slug = router.query.slug;
  const product = useFetchProductById(slug);
  const { mutate } = useFetchOptionByProductId(slug);

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
          <div
            className={Styles["user-managemnent-container"]}
            style={{ contain: "size" }}
          >
            {product.data ? (
              <div
                style={{
                  fontWeight: "800",
                  fontSize: "22px",
                  textTransform: "uppercase",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>QUẢN LÝ PHÂN LOẠI SẢN PHẨM: {product.data.name}</span>
                <Link
                  href={"/vendor/product/detail/" + product.data.product_id}
                  className="detail-product-button-container"
                >
                  <div
                    className={Styles["user-filter-button-wrapper"]}
                    style={{
                      fontWeight: "400",
                      fontSize: "15px",
                      padding: "10px",
                    }}
                  >
                    <span>
                      Quay trở về chi tiết sản phẩm {product.data.name}
                    </span>
                  </div>
                </Link>
              </div>
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
            {/* <div className={Styles["markup-container"]}>
              <div className={Styles["markup-item"]}>
                <span>Foundation</span>
                <ClearOutlinedIcon className={Styles["markup-icon"]} />
              </div>
              <div className={Styles["markup-item"]}>
                <span>HaTHH</span>
                <ClearOutlinedIcon className={Styles["markup-icon"]} />
              </div>
            </div> */}
            <OptionList
              productId={slug}
              token={token}
              setOption={updateCurrentOption}
              handleOpenDialog={handlingOpenEditProductDialog}
              handleCloseDialog={handlingOpenEditProductDialog}
            />
            <AddOptionDialog
              mutate={mutate}
              id={product.data.product_id}
              token={token}
              isOpen={isOpenAddProductDialog}
              handleClose={handlingCloseAddProductDialog}
            />
            <EditOptionDialog
              mutate={mutate}
              token={token}
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
