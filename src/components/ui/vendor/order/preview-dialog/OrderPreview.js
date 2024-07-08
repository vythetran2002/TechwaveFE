import React from "react";
import Styles from "./styles.module.css";
import { Roboto } from "next/font/google";
import Image from "next/image";
import images from "@/assets/images";
import dayjs from "dayjs";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import ChildItem from "@/components/ui/PurchaseItemCard/ChildItem/ChildItem";
import { Empty } from "antd";

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const handleStatus = (value) => {
  if (value == 0) {
    return <span style={{ color: "#ea580c" }}>Đang chờ phê duyệt</span>;
  } else if (value == 1) {
    return <span style={{ color: "#059669" }}>Đã được phê duyệt</span>;
  } else if (value == 2) {
    return <span style={{ color: "#059669" }}>Đơn hàng đã được giao</span>;
  } else {
    return <span style={{ color: "#f43f5e" }}>Đơn hàng bị huỷ</span>;
  }
};

function OrderPreview(props) {
  const { order, status } = props;

  if (order)
    return (
      <>
        <div className={roboto.className}>
          {/* <div
          className={Styles["order-preview-container"]}
          style={{ fontWeight: "400" }}
        >
          <div className={Styles["img-container"]}>
            {order.cart_id.option != null ? (
              <Image
                src={order.cart_id.option.image}
                width={200}
                height={200}
                alt=""
                priority
              />
            ) : (
              <>
                {order.cart_id.product.image ? (
                  <>
                    <Image
                      src={order.cart_id.product.image}
                      width={200}
                      height={200}
                      alt=""
                      priority
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src={images.nonImg}
                      width={200}
                      height={200}
                      alt=""
                      priority
                    />
                  </>
                )}
              </>
            )}
          </div>
          <div className={Styles["product-info"]}>
            <div
              className={Styles["product-name-wrapper"]}
              style={{ width: "100%" }}
            >
              <span style={{ width: "20%" }}>Sản phẩm: </span>
              <span style={{ width: "80%" }}>{order.cart_id.product.name}</span>
            </div>
            <div className={Styles["product-option-wrapper"]}>
              {order.cart_id.option && (
                <>
                  <span>Phân loại: </span>
                  <span>{order.cart_id.option.name}</span>
                </>
              )}
            </div>
          </div>
          <div className={Styles["product-info"]}>
            <div className={Styles["product-name-wrapper"]}>
              <span style={{ width: "20%" }}>Họ tên: </span>
              <span style={{ width: "80%" }}>{order.fullname}</span>
            </div>
            <div className={Styles["product-option-wrapper"]}>
              <span style={{ width: "20%" }}>Số điện thoại: </span>
              <span style={{ width: "80%" }}>{order.phone}</span>
            </div>
            <div className={Styles["product-option-wrapper"]}>
              <span style={{ width: "20%" }}>Địa chỉ: </span>
              <span style={{ width: "80%" }}>{order.address}</span>
            </div>
          </div>
          <div className={Styles["product-info"]}>
            <div className={Styles["product-name-wrapper"]}>
              <span style={{ width: "30%" }}>Tổng tiền: </span>
              <span style={{ width: "70%" }}>
                {FormatPrice(order.totalBill)}
              </span>
            </div>
            <div className={Styles["product-option-wrapper"]}>
              <span style={{ width: "30%" }}>Phương thức vận chuyển: </span>
              <span style={{ width: "70%" }}>{order.express}</span>
            </div>
            <div className={Styles["product-option-wrapper"]}>
              <span style={{ width: "30%" }}>
                Phương thức thức thanh toán:{" "}
              </span>
              <span style={{ width: "70%" }}>{order.payment}</span>
            </div>
            {order.payment_id != null && order.payment_id.status == 1 ? (
              <>
                <div className={Styles["product-option-wrapper"]}>
                  <span style={{ width: "30%" }}>Thanh toán: </span>
                  <span style={{ color: "green", width: "70%" }}>
                    Đã thanh toán
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className={Styles["product-option-wrapper"]}>
                  <span style={{ width: "30%" }}>Thanh toán: </span>
                  <span style={{ color: "red", width: "70%" }}>
                    Chưa thanh toán
                  </span>
                </div>
              </>
            )}

            <div className={Styles["product-option-wrapper"]}>
              <span style={{ width: "30%" }}>Ngày đặt: </span>
              {order.createAt && (
                <span style={{ width: "70%" }}>
                  {dayjs(order.createAt).format("DD/MM/YYYY")}
                </span>
              )}
            </div>
            <div className={Styles["product-option-wrapper"]}>
              <span style={{ width: "30%" }}>Trạng thái: </span>
              <span style={{ width: "70%" }}>{handleStatus(order.status)}</span>
            </div>
          </div>
        </div> */}
          <div className={Styles["order-preview-container"]}>
            <div className={Styles["user-profile-container"]}>
              <div className={Styles["user-avatar-container"]}>
                {order.user.avatar ? (
                  <>
                    <Image
                      width={100}
                      height={100}
                      alt=""
                      priority
                      src={order.user.avatar}
                      className={Styles["img"]}
                    />
                  </>
                ) : (
                  <>
                    <Image
                      width={80}
                      height={80}
                      alt=""
                      priority
                      src={images.nonImg}
                      className={Styles["img"]}
                    />
                  </>
                )}
              </div>
              <div className={Styles["user-info-container"]}>
                <div className={Styles["user-info-row"]}>
                  <span>Tên: </span>
                  <span>{order.user.fullname}</span>
                </div>
                <div className={Styles["user-info-row"]}>
                  <span>Tỉnh, Thành phố: </span>
                  <span>{order.user.province}</span>
                </div>
                <div className={Styles["user-info-row"]}>
                  <span>Huyện, Thị trấn:</span>
                  <span>{order.user.district}</span>
                </div>
                <div className={Styles["user-info-row"]}>
                  <span>Xã:</span>
                  <span>{order.user.ward}</span>
                </div>
                <div className={Styles["user-info-row"]}>
                  <span>Địa chỉ:</span>
                  <span>{order.user.address}</span>
                </div>
              </div>
            </div>
            <div className={Styles["order-container"]}>
              <div className={Styles["list-product-container"]}>
                {order?.shop_bill_id.length != 0 ? (
                  order?.shop_bill_id.map((cart, index) => {
                    return (
                      <React.Fragment key={cart.cart.cart_id}>
                        <ChildItem data={cart} />
                      </React.Fragment>
                    );
                  })
                ) : (
                  <>
                    <Empty />
                  </>
                )}
              </div>
              <div className={Styles["date-total-container"]}>
                <div className={Styles["total-container"]}>
                  <span>Ngày đặt:</span>
                  <span style={{ fontWeight: "300" }}>
                    {dayjs(order.createAt).format("DD/MM/YYYY")}
                  </span>
                </div>
                <div className={Styles["total-container"]}>
                  <span>Tổng đơn:</span>
                  <span style={{ color: "#dc2626" }}>
                    {FormatPrice(order.totalBill)}
                  </span>
                </div>
              </div>
              <div className={Styles["order-status-container"]}>
                <div className={Styles["total-container"]}>
                  <span>Hình thức thanh toán:</span>
                  <span style={{ fontWeight: "300" }}>{order.payment}</span>
                </div>

                <div className={Styles["total-container"]}>
                  <span>Trạng thái:</span>
                  {handleStatus(order.status)}
                </div>
              </div>
              <div className={Styles["order-status-container"]}>
                <div></div>
                <div className={Styles["total-container"]}>
                  <span>Thanh toán:</span>
                  {order.paid ? (
                    <span style={{ color: "#059669" }}>Đã thanh toán</span>
                  ) : (
                    <>
                      {order.payment == "Thanh toán khi nhận hàng" &&
                      order.status != 0 &&
                      order.status != 1 &&
                      order.status != 3 &&
                      order.status != 4 ? (
                        <span style={{ color: "#059669" }}>Đã thanh toán</span>
                      ) : (
                        <span style={{ color: "#dc2626" }}>
                          Chưa thanh toán
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  else {
    return (
      <>
        <Empty />
      </>
    );
  }
}

export default OrderPreview;
