import React, { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import Image from "next/image";
import images from "@/assets/images";
import { Checkbox, Divider, InputNumber } from "antd";
import { memo } from "react";

function addElementToArray(arr, element) {
  if (typeof element === "number") {
    arr.push(element);
  } else {
    throw new Error("Invalid element type. Expected number.");
  }
}

const removeValueFromArray = (arr, value) => {
  return arr.filter((item) => item !== value);
};

function CartItem(props) {
  const { select } = props;
  // console.log(select);
  const [isChecked, setIsChecked] = useState(false);
  // console.log(props.item);

  // const handlingChange = () => {
  //   if (isChecked) {
  //     setIsChecked(false);
  //     props.updateSelectedItem(null);
  //   } else {
  //     setIsChecked(true);
  //     let id = props.item.cart_id;
  //     let quantity = props.item.quantity;
  //     let price = props.item.price;
  //     let temp = { id, quantity, price };
  //     props.updateSelectedItem(temp);
  //   }
  // };

  const handlingChange = () => {
    if (isChecked) {
      setIsChecked(false);
      const temp = removeValueFromArray(select, props.item);
      props.updateSelect(temp);
    } else {
      // setIsChecked(true);
      // props.updateSelectedItem((prevSelectedItems) => [
      //   ...prevSelectedItems.filter((item) => item != props.item),
      // ]);
      setIsChecked(true);
      const temp = [...select, props.item];
      props.updateSelect(temp);
    }
  };

  useEffect(() => {
    if (props.isChecked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
    // if (isChecked) {
    //   let temp = props.item.product.product_id;
    //   props.updateSelectedItem(temp);
    // } else {
    //   props.updateSelectedItem(null);
    // }
  }, [props.isChecked]);

  return (
    <>
      {props.item ? (
        <div className={Styles["cart-item-container"]}>
          <div className={Styles["item-img-container"]}>
            <div className={Styles["checkbox-container"]}>
              <Checkbox checked={isChecked} onChange={handlingChange} />
            </div>
            <div className={Styles["item-img-wrapper"]}>
              <Image src={images.image8} alt="" className={Styles["img"]} />
            </div>
          </div>
          <div className={Styles["item-info-container"]}>
            <div className={Styles["item-name-cate-container"]}>
              <span className={Styles["name"]}>{props.item.product.name}</span>
              <span className={Styles["cate"]}>
                Origin: {props.item.product.origin}
              </span>
            </div>
            <div className={Styles["item-name-cate-container"]}>
              <span className={Styles["price"]}>
                {props.item.price}đ x {props.item.quantity}
              </span>
              <span className={Styles["quantity"]}>
                <InputNumber
                  disabled
                  min={1}
                  max={props.item.product.quantity}
                  defaultValue={props.item.quantity}
                  size="small"
                />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>Loading</>
      )}

      <Divider />
    </>
  );
}

export default memo(CartItem);
