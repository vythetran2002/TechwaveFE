import React from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import ReportItem from "./OrderItem";
import { useEffect } from "react";
import { Pagination } from "@mui/material";
import OrderItem from "./OrderItem";
import useFetchPendingOrders from "@/api/vendor/useFetchPendingOrder";
import Empty from "antd/lib/empty";

function OrderList(props) {
  const { status, limit, page, token, updateMax } = props;
  const pendingOrders = useFetchPendingOrders(status, page, limit, token);
  // console.log(pendingOrders);
  // console.log(pendingOrders);

  useEffect(() => {
    if (pendingOrders.data) {
      console.log("---");
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
              <span className={Styles["head-title"]}>Tên khách hàng</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>Số điện thoại</span>
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>Địa chỉ</span>
            </div>
            <div className={Styles["dob-wrapper"]}>
              <span className={Styles["head-title"]}>Sản phẩm</span>
            </div>
            <div className={Styles["gender-wrapper"]}>
              <span className={Styles["head-title"]}>Tổng đơn</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>Ngày đặt</span>
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>Hành động</span>
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
