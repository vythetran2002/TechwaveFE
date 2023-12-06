import React from "react";
import Styles from "./styles.module.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import images from "@/assets/images";
import Image from "next/image";
import { Button } from "antd";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FileDownloadDoneOutlinedIcon from "@mui/icons-material/FileDownloadDoneOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Empty } from "antd";
import { useRouter } from "next/router";
import { HandleReceiveOrder } from "@/api/user/handleReceiveOrder";
import OrderItem from "../vendor/order/OrderItem";
import { HandleCancleOrder } from "@/api/user/handleCancleOrder";
import Link from "next/link";

function PurchaseItemCard(props) {
  const router = useRouter();
  const { oderItem } = props;

  console.log(oderItem);

  const handleClickPay = (value) => {
    router.push(value);
  };

  const handleGoToComment = () => {
    router.push("/product/" + oderItem.cart_id.product.product_id);
  };

  const handleReceive = () => {
    const message = HandleReceiveOrder(oderItem.bill_id, props.token);
    console.log(message);
    router.push("/user/account/received");
  };

  const handleCancle = () => {
    const message = HandleCancleOrder(oderItem.bill_id, props.token);
    console.log(message);
    window.location.reload();
  };

  if (oderItem.payment_id) {
    return (
      <>
        <div className={Styles["purchase-item-container"]}>
          {oderItem.payment_id.status === 0 && (
            <div className={Styles["item-status-container"]}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <Image
                  src={images.vnpay}
                  width={30}
                  height={20}
                  alt=""
                  priority
                />
                <Button
                  onClick={() => {
                    handleClickPay(oderItem.payment_id.url);
                  }}
                  type="primary"
                  danger
                >
                  Thanh toán ngay
                </Button>
              </div>

              <div className={Styles["item-status-wrapper"]}>
                <span className={Styles["item-status-wrapper"]}>
                  <MoreHorizOutlinedIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>
                  Đơn hàng chưa được thanh toán
                </span>
              </div>
            </div>
          )}
          {oderItem.payment_id.status === 1 && (
            <div className={Styles["item-status-container"]}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <Image
                  src={images.vnpay}
                  width={30}
                  height={20}
                  alt=""
                  priority
                />
                <Button type="primary">Đã thanh toán</Button>
              </div>
              <div className={Styles["item-status-wrapper"]}>
                <span className={Styles["item-status-wrapper"]}>
                  <LocalShippingIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>
                  Đơn hàng đang được vận chuyển
                </span>
              </div>
            </div>
          )}
          {oderItem.payment_id.status === 2 && (
            <div className={Styles["item-status-container"]}>
              <div className={Styles["item-status-wrapper"]}>
                <div>
                  <span className={Styles["item-status-wrapper"]}>
                    <FileDownloadDoneOutlinedIcon />
                  </span>
                  <span style={{ marginLeft: "10px" }}>Đơn hàng đã giao</span>
                </div>
              </div>
            </div>
          )}
          {oderItem.payment_id.status === 3 && (
            <div className={Styles["item-status-container"]}>
              <div></div>
              <div
                className={Styles["item-status-wrapper"]}
                style={{ color: "black" }}
              >
                <span className={Styles["item-status-wrapper"]}>
                  <CloseOutlinedIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>Đơn hàng đã bị huỷ</span>
              </div>
            </div>
          )}
          <div className={Styles["item-info-container"]}>
            <div className={Styles["img-name-container"]}>
              <div className={Styles["img-wrapper"]}>
                {oderItem.cart_id ? (
                  oderItem.cart_id.option.image ? (
                    <>
                      <Image
                        width={80}
                        height={80}
                        src={oderItem.cart_id.option.image}
                        alt=""
                        priority={true}
                        className={Styles["img"]}
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        src={images.nonImg}
                        alt=""
                        priority={true}
                        className={Styles["img"]}
                      />
                    </>
                  )
                ) : (
                  <>
                    <Image
                      src={images.nonImg}
                      alt=""
                      priority={true}
                      className={Styles["img"]}
                    />
                  </>
                )}
              </div>
              {oderItem.cart_id && (
                <div className={Styles["name-wrapper"]}>
                  <Link
                    href={"/product/" + oderItem.cart_id.product.product_id}
                  >
                    {oderItem.cart_id.product.name}
                  </Link>
                  {oderItem.cart_id.product.option && (
                    <span>Phân loại: {props.option.name}</span>
                  )}
                  <span style={{ marginTop: "20px" }}>
                    x {oderItem.cart_id.quantity}
                  </span>
                </div>
              )}
            </div>
            <div className={Styles["price-container"]}>
              <span>{oderItem.totalBill}đ</span>
            </div>
          </div>
        </div>
      </>
    );
  } else
    return (
      <>
        <div className={Styles["purchase-item-container"]}>
          {oderItem.status === 0 && (
            <div className={Styles["item-status-container"]}>
              <Button type="primary" danger onClick={handleCancle}>
                Huỷ đơn hàng
              </Button>
              <div className={Styles["item-status-wrapper"]}>
                <span className={Styles["item-status-wrapper"]}>
                  <MoreHorizOutlinedIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>
                  Đơn hàng đang được chờ phê duyệt
                </span>
              </div>
            </div>
          )}
          {oderItem.status === 1 && (
            <div className={Styles["item-status-container"]}>
              <Button onClick={handleReceive} type="primary">
                Đã nhận được hàng
              </Button>
              <div className={Styles["item-status-wrapper"]}>
                <span className={Styles["item-status-wrapper"]}>
                  <LocalShippingIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>
                  Đơn hàng đang được vận chuyển
                </span>
              </div>
            </div>
          )}
          {oderItem.status === 2 && (
            <div className={Styles["item-status-container"]}>
              <div className={Styles["item-status-wrapper"]}>
                <span className={Styles["item-status-wrapper"]}>
                  <FileDownloadDoneOutlinedIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>Đơn hàng đã giao</span>
              </div>
              <div>
                <Button type="primary" onClick={handleGoToComment}>
                  Đánh giá đơn hàng
                </Button>
              </div>
            </div>
          )}
          {oderItem.status === 3 && (
            <div className={Styles["item-status-container"]}>
              <div></div>
              <div
                className={Styles["item-status-wrapper"]}
                style={{ color: "black" }}
              >
                <span className={Styles["item-status-wrapper"]}>
                  <CloseOutlinedIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>Đơn hàng đã bị huỷ</span>
              </div>
            </div>
          )}
          {oderItem.status === 4 && (
            <div className={Styles["item-status-container"]}>
              <div></div>
              <div
                className={Styles["item-status-wrapper"]}
                style={{ color: "black" }}
              >
                <span className={Styles["item-status-wrapper"]}>
                  <CloseOutlinedIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>Đã huỷ đơn hàng</span>
              </div>
            </div>
          )}
          <div className={Styles["item-info-container"]}>
            <div className={Styles["img-name-container"]}>
              <div className={Styles["img-wrapper"]}>
                {oderItem.cart_id.option ? (
                  oderItem.cart_id.option.image ? (
                    <>
                      <Image
                        width={80}
                        height={80}
                        src={oderItem.cart_id.option.image}
                        alt=""
                        priority={true}
                        className={Styles["img"]}
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        src={images.nonImg}
                        alt=""
                        priority={true}
                        className={Styles["img"]}
                      />
                    </>
                  )
                ) : (
                  <>
                    <Image
                      src={images.nonImg}
                      alt=""
                      priority={true}
                      className={Styles["img"]}
                    />
                  </>
                )}
              </div>
              {oderItem.cart_id && (
                <div className={Styles["name-wrapper"]}>
                  <Link
                    href={"/product/" + oderItem.cart_id.product.product_id}
                  >
                    {oderItem.cart_id.product.name}
                  </Link>
                  {oderItem.cart_id.product.option && (
                    <span>Phân loại: {props.option.name}</span>
                  )}
                  <span style={{ marginTop: "20px" }}>
                    x {oderItem.cart_id.quantity}
                  </span>
                </div>
              )}
            </div>
            <div className={Styles["price-container"]}>
              <span>{oderItem.totalBill}đ</span>
            </div>
          </div>
        </div>
      </>
    );
}

export default PurchaseItemCard;
