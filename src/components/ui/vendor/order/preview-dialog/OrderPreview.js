import React from "react";
import Styles from "./styles.module.css";
import { Roboto } from "next/font/google";
import Image from "next/image";
import images from "@/assets/images";
import dayjs from "dayjs";
import { FormatPrice } from "@/assets/utils/PriceFormat";

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
    return <span style={{ color: "#dc2626" }}>Đơn hàng không được duyệt</span>;
  } else {
    return <span>Đơn hàng bị huỷ</span>;
  }
};

function OrderPreview(props) {
  const { order } = props;

  return (
    <>
      <div className={roboto.className}>
        <div
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
        </div>
      </div>
    </>
  );
}

export default OrderPreview;
