import React, { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import images from "@/assets/images";
import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import DeleteIcon from "@mui/icons-material/Delete";
import { InputNumber } from "antd";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import Link from "next/link";
import { Tooltip } from "antd";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const Checkbox = dynamic(() => import("antd/es/checkbox/Checkbox"), {
  ssr: false,
});

function FavouriteItemCard(props) {
  //states
  const [isChecked, setIsChecked] = useState(false);
  const linkRef = useRef(null);

  // console.log(props.product.product);

  const handlingChange = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  useEffect(() => {
    if (props.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [props.checked]);

  const handlingClickDelete = () => {
    let temp = props.product.product.product_id;
    props.onClickDelete(temp);
    console.log(temp);
  };

  const onClickImg = () => {
    console.log(linkRef);
    linkRef.current.click();
  };

  return (
    <>
      {props.product ? (
        <>
          <div className={Styles["card-container"]}>
            <div className={Styles["checkbox-name-wrapper"]}>
              {/* <div className="flex03 center">
                <Checkbox checked={isChecked} onChange={handlingChange} />
              </div> */}
              <div className={Styles["img-name-container"]}>
                {props.product.product.image ? (
                  <Image
                    src={props.product.product.image}
                    alt=""
                    width={100}
                    height={100}
                    className={Styles["item-img"]}
                    onClick={onClickImg}
                  />
                ) : (
                  <Image
                    src={images.image8}
                    alt=""
                    width={100}
                    height={100}
                    className={Styles["item-img"]}
                    onClick={onClickImg}
                  />
                )}

                <Link
                  href={"/product/" + props.product.product.product_id}
                  style={{ fontSize: "15px" }}
                  className={Styles["link"]}
                  ref={linkRef}
                >
                  {props.product.product.name}
                </Link>
              </div>
            </div>
            <div className={Styles["remain-detail-wrapper"]}>
              {props.product.product.promotional_price ? (
                <>
                  <div
                    className="flex1 center"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <span style={{ textDecoration: "line-through" }}>
                      {" "}
                      {FormatPrice(props.product.product.price)}
                    </span>
                    <span>
                      {" "}
                      {FormatPrice(props.product.product.promotional_price)}
                    </span>
                  </div>
                </>
              ) : (
                <div
                  className="flex1 center"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <span> {FormatPrice(props.product.product.price)}</span>
                </div>
              )}

              <span className="flex1 center">
                <InputNumber
                  min={1}
                  max={props.product.product.quantity}
                  defaultValue={props.product.product.quantity}
                  disabled
                />
              </span>
              <span className="flex1 center">
                {props.product.product.origin}
              </span>
              <div
                className="flex1 center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  onClick={handlingClickDelete}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  <Tooltip placement="bottom" title="Xoá sản phẩm">
                    <DeleteIcon />
                  </Tooltip>
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>Loading</>
      )}
    </>
  );
}

export default FavouriteItemCard;
