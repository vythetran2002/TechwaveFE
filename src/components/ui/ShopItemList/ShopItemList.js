import React from "react";
import Item from "../ItemList/Item/Item";
import Styles from "./styles.module.css";
import useFetchShopByPage from "@/api/shop/useFetchShopByPage";
import { Empty } from "antd";
import { useEffect } from "react";

function ShopItemList(props) {
  const {
    id,
    cateId,
    setDeTailItem,
    page,
    updateMax,
    handleOpenDialog,
    handleCloseDialog,
    handlingAddCartItem,
  } = props;
  const products = useFetchShopByPage(id, page, 5);
  // console.log(products);

  useEffect(() => {
    if (products.data) {
      console.log("---");
      if (products.data.data[cateId]) {
        updateMax(products.data.data[cateId].products.total);
      }
    }
  }, [products.data, cateId]);

  if (products.isLoading) {
    return <>Loading</>;
  }
  if (products.isError) {
    return <>Error</>;
  } else
    return (
      <div className={Styles["filter-item-list-container"]}>
        {products.data.data[cateId].products.results.length != 0 ? (
          products.data.data[cateId].products.results.map(
            (productItem, index) => {
              return (
                <React.Fragment key={"productItem" + index}>
                  <Item
                    addCartItem={handlingAddCartItem}
                    handleCloseDialog={handleCloseDialog}
                    item={productItem}
                    setDeTailItem={setDeTailItem}
                    handlingOpenDialog={handleOpenDialog}
                  />
                </React.Fragment>
              );
            }
          )
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              padding: "20px 0 20px 0",
            }}
          >
            <Empty />
          </div>
        )}
      </div>
    );
}

export default ShopItemList;
