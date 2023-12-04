import React from "react";
import Styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import images from "@/assets/images";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import { memo } from "react";
import { Rating } from "@mui/material";
import { Tooltip } from "antd";
import { DeleteFavouriteItem } from "@/api/user/deleteFavouriteProduct";

function Item(props) {
  const handlingOpenDialog = () => {
    props.setDeTailItem(props.item);
    props.handlingOpenDialog();
  };

  const handlingAddFavouriteProduct = () => {
    let temp = { ...props.item };

    if (temp.product_id) {
      props.addFavourite(temp.product_id);
    }
  };

  const handleRemoveFavProduct = () => {
    const message = DeleteFavouriteItem(props.item.product_id, props.token);
    console.log(message);
  };

  const handlingAddCartItem = () => {
    let id = props.item.product_id;
    let quantity = 1;
    let price = props.item.promotional_price;
    // let optionId = 5;
    let temp = { quantity: quantity, price: price, product_id: id };
    props.addCartItem(temp);
  };

  if (props.error) return <div>Lỗi khi tải dữ liệu</div>;
  if (props.loading) return <div>Đang tải...</div>;

  return (
    <>
      {props.item ? (
        <div className={Styles["item-wrapper"]}>
          <div className={Styles["item-card-container"]}>
            <div className={Styles["item-img-container"]}>
              <div className={Styles["comparision-btn-wrapper"]}>
                <div className={Styles["dot-wrapper"]}>-36%</div>
                <div
                  className={Styles["comparision-btn-container"]}
                  aria-describedby="trash-desc"
                >
                  <CompareArrowsOutlinedIcon
                    sx={{
                      fontSize: "20px",
                    }}
                  />
                </div>
              </div>
              {props.item.image != null ? (
                <>
                  <Link href={"/"} style={{ width: "100%", height: "100%" }}>
                    <Image
                      width={1000}
                      height={1000}
                      src={props.item.image}
                      priority
                      alt=""
                      className={Styles["img"]}
                    />
                  </Link>
                </>
              ) : (
                <Link href={"/"} style={{ width: "100%", height: "100%" }}>
                  <Image src={images.image8} alt="" className={Styles["img"]} />
                </Link>
              )}
            </div>
            <div className={Styles["item-title-container"]}>
              <span>{props.item.name}</span>
            </div>
            <div className={Styles["item-price-container"]}>
              <span>{props.item.price}đ</span>
              <span id={Styles["promo-price"]}>
                {props.item.promotional_price}đ
              </span>
            </div>
            <div className={Styles["item-rating-container"]}>
              <div className={Styles["item-rating-wrapper"]}>
                {/* {props.item.rating ? (
                <Rating value={0} precision={0.5} readOnly size="small" />
              ) : (
                <Rating
                  value={props.item.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              )} */}
                <Rating
                  value={parseInt(props.item.rating)}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </div>
              <span className={Styles["buy-count"]}>
                Đã bán {props.item.haveSales}
              </span>
            </div>
            <div className={Styles["item-rating-container"]}>
              <span className={Styles["buy-count"]}>{props.item.place}</span>
            </div>
            <div className={Styles["item-btn-container"]}>
              <Tooltip title="Xem chi tiết sản phẩm">
                <button
                  className={Styles["visibility-btn"]}
                  onClick={handlingOpenDialog}
                >
                  <VisibilityOutlinedIcon className={Styles["icon"]} />
                </button>
              </Tooltip>
              <Tooltip title="Đặt hàng">
                <button
                  className={Styles["buy-btn"]}
                  onClick={handlingAddCartItem}
                >
                  Chọn mua
                </button>
              </Tooltip>
              <Tooltip title="Thêm vào danh sách yêu thích">
                {props.item.favStatus ? (
                  <button
                    className={Styles["favor-btn"]}
                    onClick={handleRemoveFavProduct}
                  >
                    <FavoriteBorderOutlined
                      className={Styles["icon"]}
                      style={{ color: "red" }}
                    />
                  </button>
                ) : (
                  <button
                    className={Styles["favor-btn"]}
                    onClick={handlingAddFavouriteProduct}
                  >
                    <FavoriteBorderOutlined className={Styles["icon"]} />
                  </button>
                )}
              </Tooltip>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={Styles["item-wrapper"]}>
            <div className={Styles["item-card-container"]}>Loading...</div>
          </div>
        </>
      )}
    </>
  );
}

export default memo(Item);
