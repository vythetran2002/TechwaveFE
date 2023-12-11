import React, { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import Image from "next/image";
import images from "@/assets/images";
import { Checkbox, Divider, InputNumber } from "antd";
import { memo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { UpdateCartItem } from "@/api/user/updateCartItem";
import { FormatPrice } from "@/assets/utils/PriceFormat";

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
  const { token } = props;

  const { select } = props;
  const [isEditMode, setIsEditMode] = useState(false);
  // console.log(select);
  const [isChecked, setIsChecked] = useState(false);

  const [quantity, setQuantity] = useState(props.item.quantity);

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

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleUpdateCartItem = () => {
    const message = UpdateCartItem(props.item.cart_id, quantity, token);
    console.log(message);
    setIsEditMode(false);
  };

  const handleUpdateQuantity = (value) => {
    if (value) {
      setQuantity(value);
    }
  };

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
              {props.item.option ? (
                <>
                  <Image
                    width={100}
                    height={100}
                    src={props.item.option.image}
                    alt=""
                    className={Styles["img"]}
                  />
                </>
              ) : (
                <>
                  {props.item.product.image ? (
                    <>
                      <Image
                        width={100}
                        height={100}
                        src={props.item.product.image}
                        alt=""
                        className={Styles["img"]}
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        width={100}
                        height={100}
                        src={images.nonImg}
                        alt=""
                        className={Styles["img"]}
                      />
                    </>
                  )}
                </>
              )}
              {/* <Image
                width={100}
                height={100}
                src={images.image8}
                alt=""
                className={Styles["img"]}
              /> */}
            </div>
          </div>
          <div className={Styles["item-info-container"]}>
            <div className={Styles["item-name-cate-container"]}>
              <span className={Styles["name"]}>{props.item.product.name}</span>
              <span className={Styles["cate"]}>
                {props.item.option && <>Phân loại: {props.item.option.name}</>}
                {/* Origin: {props.item.product.origin} */}
              </span>
            </div>
            <div className={Styles["item-name-cate-container"]}>
              <div className={Styles["price"]}>
                <span>
                  {" "}
                  {FormatPrice(props.item.price)} x {props.item.quantity}
                </span>
                <span
                  onClick={handleToggleEditMode}
                  className={Styles["edit-cart-btn"]}
                  style={{ backgroundColor: isEditMode ? "black" : "white" }}
                >
                  <EditIcon
                    style={{
                      fontSize: "15px",
                      color: isEditMode ? "white" : "black",
                    }}
                  />
                </span>
              </div>
              <span className={Styles["quantity"]}>
                <InputNumber
                  disabled={!isEditMode}
                  min={1}
                  max={props.item.product.quantity}
                  value={quantity}
                  size="small"
                  onChange={handleUpdateQuantity}
                />
                {isEditMode && (
                  <span
                    className={Styles["submit-update-cart-btn"]}
                    onClick={handleUpdateCartItem}
                  >
                    <DoneIcon
                      style={{
                        fontSize: "15px",
                        color: "white",
                      }}
                    />
                  </span>
                )}
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
