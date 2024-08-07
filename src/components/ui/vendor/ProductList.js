import React from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import ProductItem from "./ProductItem";
import { useEffect } from "react";
import useFetchProductsByPage from "@/api/vendor/useFetchProductsByPage";
import { Diversity1TwoTone } from "@mui/icons-material";
import { Empty, Typography } from "antd";

function ProductList(props) {
  const { limit, page, token, updateMax } = props;
  const products = useFetchProductsByPage(page, limit, token);
  //console.log(products.data);

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
                <div>Tên</div>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>
                <div>Số Lượng</div>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>
                <div>Giá gốc</div>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>
                <div>Giá Khuyến Mãi</div>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["dob-wrapper"]}>
              <span className={Styles["head-title"]}>
                <div>Hình ảnh</div>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["gender-wrapper"]}>
              <span className={Styles["head-title"]}>
                <div>Ngày tạo</div>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>
                <div>Danh mục</div>
              </span>
              <SortOutlinedIcon />
            </div>
          </div>
          {products.data.results.length != 0 ? (
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
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "20px 0 20px 0",
              }}
            >
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </div>
        {/* <div className={Styles["item-pagination-container"]}>
          <Pagination count={10} size="large" />
        </div> */}
      </>
    );
}

export default ProductList;
