import React from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import ProductItem from "./ProductItem";
import { useEffect } from "react";
import useFetchProductsByPage from "@/api/vendor/useFetchProductsByPage";
import { Textfit } from "react-textfit";

function ProductList(props) {
  const { limit, page, token, updateMax } = props;
  const products = useFetchProductsByPage(page, limit, token);
  // console.log(products);

  useEffect(() => {
    if (products.data) {
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
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Tên</Textfit>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Số Lượng</Textfit>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Giá gốc</Textfit>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Giá Khuyến Mãi</Textfit>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["dob-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Hình ảnh</Textfit>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["gender-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Ngày tạo</Textfit>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Danh mục</Textfit>
              </span>
              <SortOutlinedIcon />
            </div>
          </div>
          {products.data.results.lenght != 0 ? (
            products.data.results.map((productItem, index) => {
              return (
                <React.Fragment key={"productItem" + index}>
                  <ProductItem
                    mutate={products.mutate}
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
