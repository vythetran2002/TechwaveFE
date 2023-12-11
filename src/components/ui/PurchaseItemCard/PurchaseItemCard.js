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
import { animateScroll as scroll } from "react-scroll";
import { FormatPrice } from "@/assets/utils/PriceFormat";

function PurchaseItemCard(props) {
  const router = useRouter();
  const { oderItem } = props;

  // console.log(oderItem);

  const handleClickPay = (value) => {
    router.push(value);
  };

  const handleGoToComment = () => {
    router.push({
      pathname: "/product/" + oderItem.cart_id.product.product_id,
      query: {
        nav: "comment",
      },
    });
    // router.push(
    //   `/product/[id]`,
    //   `/product/${oderItem.cart_id.product.product_id}`
    // );
    // setTimeout(() => {
    //   scroll.scrollTo("#danhGia", {
    //     smooth: true,
    //     duration: 500,
    //   });
    // }, 500);
  };

  const handleReceive = () => {
    const message = HandleReceiveOrder(oderItem.bill_id, props.token);
    console.log(message);
    router.push("/user/account/received");
  };

  const handleCancle = () => {
    const message = HandleCancleOrder(oderItem.bill_id, props.token);
    console.log(message);
  };

  if (oderItem.payment_id) {
    return (
      <>
        <div className={Styles["purchase-item-container"]}>
          {oderItem.status === 0 && (
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
                {oderItem.payment_id.status == 0 && (
                  <Button
                    onClick={() => {
                      handleClickPay(oderItem.payment_id.url);
                    }}
                    type="primary"
                    danger
                  >
                    Thanh toán ngay
                  </Button>
                )}
                {oderItem.payment_id.status == 1 && (
                  <Button style={{ cursor: "default" }}>Đã thanh toán</Button>
                )}
                <Button type="primary" danger onClick={handleCancle}>
                  Huỷ đơn hàng
                </Button>
              </div>

              <div className={Styles["item-status-wrapper"]}>
                <span className={Styles["item-status-wrapper"]}>
                  <MoreHorizOutlinedIcon />
                </span>
                {oderItem.payment_id.status == 0 && (
                  <span style={{ marginLeft: "10px" }}>
                    Đơn hàng chưa được thanh toán
                  </span>
                )}
                {oderItem.payment_id.status == 1 && (
                  <span style={{ marginLeft: "10px" }}>
                    Đơn hàng đang chờ xác nhận
                  </span>
                )}
              </div>
            </div>
          )}
          {oderItem.status === 1 && (
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
                {oderItem.payment_id.status === 1 && (
                  <Button disabled>Đã thanh toán</Button>
                )}
                <Button onClick={handleReceive} type="primary">
                  Đã nhận được hàng
                </Button>
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
          {oderItem.status === 2 && (
            <div className={Styles["item-status-container"]}>
              <div
                className={Styles["item-status-wrapper"]}
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex" }}>
                  <span className={Styles["item-status-wrapper"]}>
                    <FileDownloadDoneOutlinedIcon />
                  </span>
                  <span style={{ marginLeft: "10px" }}>Đơn hàng đã giao</span>
                  <Image
                    style={{ marginLeft: "20px" }}
                    src={images.vnpay}
                    width={25}
                    height={20}
                  />
                </div>
                <div>
                  {oderItem.cart_id && (
                    <Button type="primary" onClick={handleGoToComment}>
                      Đánh giá đơn hàng
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
          {oderItem.status === 3 && (
            <div className={Styles["item-status-container"]}>
              <div>
                <Image
                  src={images.vnpay}
                  width={25}
                  height={20}
                  alt=""
                  priority
                  style={{ marginLeft: "5px" }}
                />
              </div>
              <div
                className={Styles["item-status-wrapper"]}
                style={{ color: "black" }}
              >
                <span className={Styles["item-status-wrapper"]}>
                  <CloseOutlinedIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>
                  Đơn hàng đã bị từ chối
                </span>
              </div>
            </div>
          )}
          {oderItem.status === 4 && (
            <div className={Styles["item-status-container"]}>
              <div>
                <Image
                  src={images.vnpay}
                  width={25}
                  height={20}
                  alt=""
                  priority
                  style={{ marginLeft: "5px" }}
                />
              </div>
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
                {oderItem.cart_id &&
                  (oderItem.cart_id.option ? (
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
                      {oderItem.cart_id.product.image ? (
                        <>
                          <Image
                            width={80}
                            height={80}
                            src={oderItem.cart_id.product.image}
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
                      )}
                    </>
                  ))}
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
              <span>{FormatPrice(oderItem.totalBill)}</span>
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
                {oderItem.cart_id && (
                  <Button type="primary" onClick={handleGoToComment}>
                    Đánh giá đơn hàng
                  </Button>
                )}
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
                {oderItem.cart_id ? (
                  oderItem.cart_id.option ? (
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
              <span>{FormatPrice(oderItem.totalBill)}</span>
            </div>
          </div>
        </div>
      </>
    );
}

export default PurchaseItemCard;
