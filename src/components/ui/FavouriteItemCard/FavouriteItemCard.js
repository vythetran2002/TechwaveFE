import React, { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import images from "@/assets/images";
import Image from "next/image";
import dynamic from "next/dynamic";
import DeleteIcon from "@mui/icons-material/Delete";
import { InputNumber } from "antd";

const Checkbox = dynamic(() => import("antd/es/checkbox/Checkbox"), {
  ssr: false,
});

function FavouriteItemCard(props) {
  //states
  const [isChecked, setIsChecked] = useState(false);

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

  return (
    <>
      {props.product ? (
        <>
          <div className={Styles["card-container"]}>
            <div className={Styles["checkbox-name-wrapper"]}>
              <div className="flex03 center">
                <Checkbox checked={isChecked} onChange={handlingChange} />
              </div>
              <div className={Styles["img-name-container"]}>
                <Image
                  src={images.image8}
                  alt=""
                  className={Styles["item-img"]}
                />
                <span style={{ fontSize: "15px" }}>
                  {props.product.product.name}
                </span>
              </div>
            </div>
            <div className={Styles["remain-detail-wrapper"]}>
              <span className="flex1 center">
                {props.product.product.price}đ
              </span>
              <span className="flex1 center">
                <InputNumber
                  min={1}
                  max={props.product.product.quantity}
                  defaultValue={1}
                />
              </span>
              <span className="flex1 center">
                {props.product.product.promotional_price}đ
              </span>
              <span
                onClick={handlingClickDelete}
                className="flex1 center"
                style={{ cursor: "pointer" }}
              >
                <DeleteIcon />
              </span>
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
