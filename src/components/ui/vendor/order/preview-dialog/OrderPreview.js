import React from "react";
import Styles from "./styles.module.css";
import { Roboto } from "next/font/google";
import Image from "next/image";
import images from "@/assets/images";
import dayjs from "dayjs";

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
            <div className={Styles["product-name-wrapper"]}>
              <span>Sản phẩm: </span>
              <span>{order.cart_id.product.name}</span>
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
              <span>Họ tên: </span>
              <span>{order.fullname}</span>
            </div>
            <div className={Styles["product-option-wrapper"]}>
              <span>Số điện thoại: </span>
              <span>{order.phone}</span>
            </div>
            <div className={Styles["product-option-wrapper"]}>
              <span>Địa chỉ: </span>
              <span>{order.address}</span>
            </div>
          </div>
          <div className={Styles["product-info"]}>
            <div className={Styles["product-name-wrapper"]}>
              <span>Tổng tiền: </span>
              <span>${order.totalBill}</span>
            </div>
            <div className={Styles["product-option-wrapper"]}>
              <span>Phương thức vận chuyển: </span>
              <span>{order.express}</span>
            </div>
            <div className={Styles["product-option-wrapper"]}>
              <span>Phước thức thanh toán: </span>
              <span>{order.payment}</span>
            </div>
            <div className={Styles["product-option-wrapper"]}>
              <span>Ngày đặt: </span>
              {order.createAt && (
                <span>{dayjs(order.createAt).format("DD/MM/YYYY")}</span>
              )}
            </div>
            <div className={Styles["product-option-wrapper"]}>
              <span>Trạng thái: </span>
              {handleStatus(order.status)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderPreview;
