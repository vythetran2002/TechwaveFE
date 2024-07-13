import React from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { useEffect } from "react";
import OrderItem from "./OrderItem";
import useFetchPendingOrders from "@/api/vendor/useFetchPendingOrder";
import Empty from "antd/lib/empty";

import { LoadingOutlined } from "@ant-design/icons";

const mockedData = {
  data: {
    total: 4,
    next: {
      page: 2,
      limit: 3,
    },
    results: [
      {
        bill_id: 83,
        user: {
          avatar:
            "https://i.pinimg.com/736x/f8/8d/3e/f88d3ec01258d11f0ea0fc4a81623d64.jpg",
          fullname: "VY VY V3",
          phone: "0336289854",
          address: "DONG NAI Xã Xuân Thành Huyện Xuân Lộc Đồng Nai",
          province: "Đồng Nai",
          district: "Xã Xuân Thành",
          ward: "Huyện Xuân Lộc",
        },
        totalBill: 1340000,
        payment: "Thanh toán khi nhận hàng",
        createAt: "2024-05-19T10:36:24.000Z",
        payment_id: null,
        paid: false, // Thanh toan hay chua
        status: 0, // 0: cho xac nhan, 1: dang dc van chuyen, 2: da giao thanh cong, 3: da bi tu choi, 4: da bi huy
        shop_bill_id: [
          {
            cart: {
              cart_id: 39,
              product: {
                product_id: 21,
                name: "Nuoshou k47 điện thoại di động đơn bàn phím cơ bộ chuột bàn tay trái trò chơi di động ",
                image:
                  "https://res.cloudinary.com/dspnvohki/image/upload/v1704115343/techwave/qutybnukxy9fo0bephtd.jpg",
              },
              option: {
                option_id: 9,
                name: "Bàn phím một tay K47",
                image:
                  "https://res.cloudinary.com/dspnvohki/image/upload/v1704115546/techwave/pdhlq4jgfgca5ucjt0fc.jpg",
              },
              quantity: 2,
            },
            price: 680000,
            price_desc: null,
            status: 0,
          },
          {
            cart: {
              cart_id: 40,
              product: {
                product_id: 26,
                name: "Củ sạc nhanh 20w chính hãng HOCO - Bộ sạc type c tiêu chuẩn pd20w điện thoại dùng cho iphone samsung xiaomi ..",
                image:
                  "https://res.cloudinary.com/dspnvohki/image/upload/v1704128101/techwave/auqwzz3gkrd8baxeolx9.jpg",
              },
              option: {
                option_id: 22,
                name: "BÁN LẺ CÁP",
                image:
                  "https://res.cloudinary.com/dspnvohki/image/upload/v1704128370/techwave/nh9bk7ck4mfk9ddeexcw.jpg",
              },
              quantity: 1,
            },
            price: 136000,
            price_desc: 46000,
            status: 0,
          },
        ],
      },
      {
        bill_id: 83,
        user: {
          avatar:
            "https://i.pinimg.com/736x/f8/8d/3e/f88d3ec01258d11f0ea0fc4a81623d64.jpg",
          fullname: "VY VY V3",
          phone: "0336289854",
          address: "DONG NAI Xã Xuân Thành Huyện Xuân Lộc Đồng Nai",
          province: "Đồng Nai",
          district: "Xã Xuân Thành",
          ward: "Huyện Xuân Lộc",
        },
        totalBill: 256001,
        payment: "Thanh toán khi nhận hàng",
        createAt: "2024-05-19T10:36:24.000Z",
        payment_id: null,
        paid: true, // Thanh toan hay chua
        status: 0,
        shop_bill_id: [
          {
            cart: {
              cart_id: 37,
              product: {
                product_id: 31,
                name: "Giày KAMITO",
                image:
                  "https://res.cloudinary.com/dspnvohki/image/upload/v1715100627/techwave/curxcrkcxe2pdlljaigp.jpg",
              },
              option: null,
              quantity: 1,
            },
            price: 250000,
            price_desc: null,
            status: 0,
          },
        ],
      },
    ],
  },
  isLoading: undefined,
  isError: undefined,
};

function OrderList(props) {
  const { status, limit, page, token, updateMax } = props;
  const pendingOrders = useFetchPendingOrders(status, page, limit, token);

  useEffect(() => {
    if (pendingOrders.data) {
      updateMax(pendingOrders.data.total);
    }
  }, [pendingOrders.data]);

  if (pendingOrders.isLoading) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "100px 0 100px 0",
        }}
      >
        <LoadingOutlined style={{ fontSize: "50px" }} />
      </div>
    );
  }
  if (pendingOrders.isError) return <>Error</>;
  else
    return (
      <>
        <div className={Styles["item-list-container"]}>
          <div className={Styles["item-list-heading-container"]}>
            <div className={Styles["id-wrapper"]}>
              <span className={Styles["head-title"]}>
                <div>Tên khách hàng</div>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>
                {" "}
                <div>Số điện thoại</div>
              </span>
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>
                <div>Địa chỉ</div>
              </span>
            </div>
            <div className={Styles["dob-wrapper"]}>
              <span className={Styles["head-title"]}>
                <div>Thanh toán</div>
              </span>
            </div>
            <div className={Styles["gender-wrapper"]}>
              <span className={Styles["head-title"]}>
                {" "}
                <div>Tổng đơn</div>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>
                <div>Ngày đặt</div>
              </span>
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>
                {" "}
                <div>Hành động</div>
              </span>
            </div>
          </div>
          {pendingOrders.data.results.length != 0 ? (
            pendingOrders.data.results.map((order, index) => {
              if (order.cart_shop.length != 0)
                return (
                  <React.Fragment key={"order" + index}>
                    <OrderItem
                      token={props.token}
                      handleOpen={props.handleOpen}
                      updateOrder={props.updateOrder}
                      mode={props.status}
                      order={order}
                      mutate={pendingOrders.mutate}
                    />
                  </React.Fragment>
                );
            })
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "20px 0 20px 0",
              }}
            >
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </div>
        {/* <div className={Styles["item-pagination-container"]}>
          <Pagination count={2} size="large" />
        </div> */}
      </>
    );
}

export default OrderList;
