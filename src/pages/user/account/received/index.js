import React from "react";
import Head from "next/head";
import Styles from "../favourites/style.module.css";
import UserLayout from "@/components/layout/UserLayout";
import { useRef } from "react";
import PurchaseItemCard from "@/components/ui/PurchaseItemCard/PurchaseItemCard";
import useFetchUserProfile from "@/api/user/useFetchUserProfile";
import useFetchReceivedProducts from "@/api/user/useFetchRecievedProduct";
import { Empty } from "antd";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

function Index() {
  const user = useFetchUserProfile();
  const orders = useFetchReceivedProducts();
  // console.log(orders);
  //Refs
  const iconRef = useRef();
  const orderingItem = useRef();
  const orderedItem = useRef();
  const pendingItem = useRef();
  const cancledItem = useRef();

  const handlingClickQLDH = () => {
    iconRef.current.classList.toggle("rt-180");
    orderedItem.current.classList.toggle("appear");
    orderingItem.current.classList.toggle("appear");
    pendingItem.current.classList.toggle("appear");
    cancledItem.current.classList.toggle("appear");
  };

  return (
    <>
      <Head>
        <title>Đơn hàng đã nhận</title>
      </Head>
      <UserLayout user={user} path={"/receivedOrders"} isActiveOrdersNav={true}>
        <Toaster />

        <div className={Styles["profile-right-edit-form-wrapper"]}>
          <div className={Styles["profile-title-container"]}>
            <span style={{ fontWeight: "400", fontSize: "20px" }}>
              Danh sách đơn hàng
            </span>
            <span>Quản lý danh sách đơn hàng</span>
          </div>
          <div className={Styles["product-purchase-item-container"]}>
            <div>
              {orders.data ? (
                orders.data.length != 0 ? (
                  orders.data.map((oderItem, index) => {
                    return (
                      <React.Fragment key={"oderItem" + index}>
                        <PurchaseItemCard oderItem={oderItem} />
                      </React.Fragment>
                    );
                  })
                ) : (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      padding: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )
              ) : (
                <>Loading</>
              )}
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}

export default Index;
