import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import UserLayout from "@/components/layout/UserLayout";
import Styles from "../favourites/style.module.css";
import { useRef } from "react";
import PurchaseItemCard from "@/components/ui/PurchaseItemCard/PurchaseItemCard";
import useFetchUserProfile from "@/api/user/useFetchUserProfile";
import useFetchUserPendingProducts from "@/api/user/useFetchPendingOrder";
import { Empty } from "antd";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

function Index() {
  const user = useFetchUserProfile();
  const orders = useFetchUserPendingProducts();
  const token = Cookies.get("token");
  // const router = useRouter();
  // const { query } = router;

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

  const handleMutateCancleOrder = () => {
    orders.mutate();
  };

  if (orders.isLoading) {
    return <>Loading</>;
  }

  if (orders.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <Head>
          <title>Đơn hàng chờ xác nhận</title>
        </Head>
        <UserLayout
          user={user}
          path={"/pendingOrders"}
          isActiveOrdersNav={true}
        >
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
                          <PurchaseItemCard
                            token={token}
                            oderItem={oderItem}
                            handleMutateCancleOrder={handleMutateCancleOrder}
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
