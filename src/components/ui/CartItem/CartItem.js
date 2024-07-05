import React, { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import Image from "next/image";
import images from "@/assets/images";
import { Checkbox, Divider, InputNumber } from "antd";
import { memo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { UpdateCartItem } from "@/api/user/updateCartItem";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import Link from "next/link";
import { Tooltip } from "antd";

function addElementToArray(arr, element) {
  if (typeof element === "number") {
    arr.push(element);
  } else {
    throw new Error("Invalid element type. Expected number.");
  }
}

const removeValueFromArray = (arr, value) => {
  if (arr) {
    return arr.filter((item) => item !== value);
  }
};

function CartItem(props) {
  const { token } = props;
  const { select } = props;
  const [isEditMode, setIsEditMode] = useState(false);
  // console.log(select);
  const [isChecked, setIsChecked] = useState(false);
  const [reload, setReload] = useState();
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

  const handleUpdateCartItem = async () => {
    const message = await UpdateCartItem(
      props.item.cart_id,
      quantity,
      props.item.option_id,
      props.item.product.price,
      token
    );
    await props.mutate();
    setIsEditMode(false);
    props.resetSelect();
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
      if (select) {
        const temp = [...select, props.item];
        props.updateSelect(temp);
      }
    }
  };

  useEffect(() => {
    if (props.isChecked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
    setQuantity(props.item.quantity);
    // if (isChecked) {
    //   let temp = props.item.product.product_id;
    //   props.updateSelectedItem(temp);
    // } else {
    //   props.updateSelectedItem(null);
    // }
  }, [props.isChecked, props.item.quantity]);

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
                  {props.item.option.image ? (
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
              <Link
                href={"/product/" + props.item.product.product_id}
                className={Styles["name"]}
              >
                {props.item.product.name}
              </Link>
              <span className={Styles["cate"]}>
                {props.item.option && <>Phân loại: {props.item.option.name}</>}
                {/* Origin: {props.item.product.origin} */}
              </span>
            </div>
            <div className={Styles["item-name-cate-container"]}>
              <div className={Styles["price"]}>
                {props.item.product.promotional_price ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ textDecoration: "line-through" }}>
                      {" "}
                      {FormatPrice(props.item.product.price)}
                    </span>
                    <span>
                      {" "}
                      {FormatPrice(props.item.product.promotional_price)} x{" "}
                      {props.item.quantity}
                    </span>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>
                      {" "}
                      {FormatPrice(props.item.product.price)} x{" "}
                      {props.item.quantity}
                    </span>
                  </div>
                )}

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
                {quantity < 5 ? (
                  <>
                    <InputNumber
                      disabled={!isEditMode}
                      min={1}
                      max={props.item.product.quantity}
                      value={quantity}
                      defaultValue={props.item.quantity}
                      size="small"
                      onChange={handleUpdateQuantity}
                    />
                  </>
                ) : (
                  <>
                    <InputNumber
                      disabled={!isEditMode}
                      min={1}
                      max={5}
                      value={quantity}
                      defaultValue={props.item.quantity}
                      size="small"
                      onChange={handleUpdateQuantity}
                    />
                  </>
                )}

                {isEditMode && (
                  <span
                    className={Styles["submit-update-cart-btn"]}
                    onClick={handleUpdateCartItem}
                  >
                    <Tooltip placement="bottom" title="Cập nhật đơn hàng">
                      <SaveAltIcon
                        style={{
                          fontSize: "15px",
                          color: "white",
                        }}
                      />
                    </Tooltip>
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
