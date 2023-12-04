import React from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import ProductItem from "./ProductItem";
import { Pagination } from "@mui/material";
import { useEffect } from "react";
import useFetchAllProduct from "@/api/vendor/useFetchAllProduct";
import useFetchOptionByProductId from "@/api/vendor/useFetchOptionByProductId";
import useFetchProductsByPage from "@/api/vendor/useFetchProductsByPage";

function ProductList(props) {
  const { limit, page, token, updateMax } = props;
  const products = useFetchProductsByPage(page, limit, token);
  // console.log(products);

  useEffect(() => {
    if (products.data) {
      console.log("---");
      updateMax(products.data.total);
    }
  }, [products.data]);

  if (products.isError) return <>Error</>;
  if (products.isLoading) return <>Loading</>;
  else
    return (
      <>
        <div className={Styles["item-list-container"]}>
          <div className={Styles["item-list-heading-container"]}>
            <div className={Styles["id-wrapper"]}>
              <span className={Styles["head-title"]}>Tên</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>Số Lượng</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>Giá gốc</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>Giá khuyến mãi</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["dob-wrapper"]}>
              <span className={Styles["head-title"]}>Hình ảnh</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["gender-wrapper"]}>
              <span className={Styles["head-title"]}>Ngày tạo</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>Danh mục</span>
              <SortOutlinedIcon />
            </div>

            {/* <div className={Styles["fullname-wrapper"]}>
            <span className={Styles["head-title"]}>Tên danh mục</span>
            <SortOutlinedIcon />
          </div>
          <div className={Styles["email-wrapper"]}>
            <span className={Styles["head-title"]}>Danh mục cha</span>
            <SortOutlinedIcon />
          </div>
          <div className={Styles["dob-wrapper"]}>
            <span className={Styles["head-title"]}>Ngày tạo</span>
            <SortOutlinedIcon />
          </div> */}
          </div>
          {products.data.results.lenght != 0 ? (
            products.data.results.map((productItem, index) => {
              return (
                <React.Fragment key={"productItem" + index}>
                  <ProductItem
                    token={props.token}
                    updateProduct={props.updateProduct}
                    product={productItem}
                    handleOpenDialog={props.handleOpenDialog}
                  />
                </React.Fragment>
              );
            })
          ) : (
            <>Empty</>
          )}
        </div>
        {/* <div className={Styles["item-pagination-container"]}>
          <Pagination count={10} size="large" />
        </div> */}
      </>
    );
}

export default ProductList;
