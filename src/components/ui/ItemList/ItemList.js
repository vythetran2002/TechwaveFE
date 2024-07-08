import React, { useRef, useState } from "react";
import Styles from "./style.module.css";
import Item from "./Item/Item";
import ItemDetail from "./Item/ItemDetail/ItemDetail";
import { memo } from "react";

function ItemList(props) {
  let listCate = null;

  if (props.isError) return <div>Lỗi khi tải dữ liệu</div>;
  if (props.isLoading) return <div>Đang tải...</div>;
  if (props.items) {
    listCate = props.items.data;
  }

  // console.log(props.items.data);
  return (
    <>
      <section className={Styles["item-list-wrapper"]}>
        <div className={Styles["item-list-container"]}>
          {listCate &&
            listCate.map((item, index) => {
              return (
                <React.Fragment key={props.itemKey + index}>
                  <Item
                    mutate={props.mutate}
                    addFavourite={props.addFavourite}
                    item={item}
                    token={props.token}
                    error={props.isError}
                    loading={props.isLoading}
                    handlingOpenDialog={props.handlingOpenDialog}
                    setDeTailItem={props.setDeTailItem}
                    addCartItem={props.addCartItem}
                  />
                </React.Fragment>
              );
            })}
        </div>
      </section>
    </>
  );
}

export default memo(ItemList);
