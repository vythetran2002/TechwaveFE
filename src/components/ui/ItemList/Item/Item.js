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
import { FormatPrice } from "@/assets/utils/PriceFormat";
import toast from "react-hot-toast";

function Item(props) {
  const handlingOpenDialog = () => {
    props.setDeTailItem(props.item);
    props.handlingOpenDialog();
  };

  const handlingAddFavouriteProduct = async () => {
    let temp = { ...props.item };
    if (temp.product_id) {
      await props.addFavourite(temp.product_id);
      await props.mutate();
    }
  };

  const handleRemoveFavProduct = async () => {
    const message = await DeleteFavouriteItem(
      props.item.product_id,
      props.token
    );
    await props.mutate();
  };

  const handlingAddCartItem = () => {
    if (props.item.option.length != 0) {
      handlingOpenDialog();
      // toast("Hãy chọn loại sản phẩm", {
      //   icon: "⌨️",
      // });
    } else {
      let id = props.item.product_id;
      let quantity = 1;
      let price = props.item.promotional_price;
      // let optionId = 5;
      let temp = { quantity: quantity, price: price, product_id: id };
      props.addCartItem(temp);
    }
  };

  if (props.error) return <div>Lỗi khi tải dữ liệu</div>;
  if (props.loading) return <div>Đang tải...</div>;

  return (
    <>
      {props.item ? (
        <div className={Styles["item-wrapper"]}>
          <div className={Styles["item-card-container"]}>
            <div className={Styles["item-img-container"]}>
              {props.item.image != null ? (
                <>
                  <div
                    style={{ width: "100%", height: "100%" }}
                    onClick={handlingOpenDialog}
                  >
                    <Image
                      width={1000}
                      height={1000}
                      src={props.item.image}
                      priority={true}
                      alt={images.techwave}
                      className={Styles["img"]}
                    />
                  </div>
                </>
              ) : (
                <Link
                  style={{ width: "100%", height: "100%" }}
                  handlingOpenDialog
                >
                  <Image src={images.image8} alt="" className={Styles["img"]} />
                </Link>
              )}
            </div>
            <span className={Styles["item-title-container"]}>
              {props.item.name}
            </span>
            {props.item.promotional_price ? (
              <div className={Styles["item-price-container"]}>
                <span style={{ color: "red" }}>
                  {FormatPrice(props.item.promotional_price)}
                </span>
                <span id={Styles["promo-price"]}>
                  {FormatPrice(props.item.price)}
                </span>
              </div>
            ) : (
              <div className={Styles["item-price-container"]}>
                <span id={Styles["price"]}>
                  {FormatPrice(props.item.price)}
                </span>
              </div>
            )}

            <div>
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
                    sx={{
                      fontSize: "16px",
                    }}
                    value={parseInt(props.item.rating)}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </div>
                {props.item.haveSales ? (
                  <span className={Styles["buy-count"]}>
                    Đã bán {props.item.haveSales}
                  </span>
                ) : (
                  <span className={Styles["buy-count"]}>Đã bán 0</span>
                )}
              </div>
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
