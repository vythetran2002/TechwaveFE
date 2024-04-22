import React from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { useEffect } from "react";
import OrderItem from "./OrderItem";
import useFetchPendingOrders from "@/api/vendor/useFetchPendingOrder";
import Empty from "antd/lib/empty";
import { Textfit } from "react-textfit";

function OrderList(props) {
  const { status, limit, page, token, updateMax } = props;
  const pendingOrders = useFetchPendingOrders(status, page, limit, token);
  // console.log(pendingOrders);
  // console.log(pendingOrders);

  useEffect(() => {
    if (pendingOrders.data) {
      updateMax(pendingOrders.data.total);
    }
  }, [pendingOrders.data]);

  if (pendingOrders.isLoading) {
    return <>Loading</>;
  }
  if (pendingOrders.isError) return <>Error</>;
  else
    return (
      <>
        <div className={Styles["item-list-container"]}>
          <div className={Styles["item-list-heading-container"]}>
            <div className={Styles["id-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Tên khách hàng</Textfit>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>
                {" "}
                <Textfit mode="single">Số điện thoại</Textfit>
              </span>
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Địa chỉ</Textfit>
              </span>
            </div>
            <div className={Styles["dob-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Sản phẩm</Textfit>
              </span>
            </div>
            <div className={Styles["gender-wrapper"]}>
              <span className={Styles["head-title"]}>
                {" "}
                <Textfit mode="single">Tổng đơn</Textfit>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Ngày đặt</Textfit>
              </span>
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>
                {" "}
                <Textfit mode="single">Hành động</Textfit>
              </span>
            </div>
          </div>
          {pendingOrders.data.results.length != 0 ? (
            pendingOrders.data.results.map((order, index) => {
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
