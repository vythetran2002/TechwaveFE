import React from "react";
import Head from "next/head";
import UserLayout from "@/components/layout/UserLayout";
import Styles from "../favourites/style.module.css";
import PurchaseItemCard from "@/components/ui/PurchaseItemCard/PurchaseItemCard";
import useFetchUserProfile from "@/api/user/useFetchUserProfile";
import useFetchShippingOrders from "@/api/user/useFetchShippingOrders";
import { Empty } from "antd";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

function Index() {
  const user = useFetchUserProfile();
  const orders = useFetchShippingOrders();

  const token = Cookies.get("token");
  // const router = useRouter();
  // const { query } = router;

  if (orders.isLoading) {
    return <>Loading</>;
  }

  if (orders.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <Head>
          <title>Đơn hàng vận chuyển</title>
        </Head>
        <UserLayout
          user={user}
          path={"/shippingOrders"}
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
                    orders.data.map((item, index) => {
                      if (item.cart_shop.length != 0)
                        return (
                          <React.Fragment key={"item" + index}>
                            <PurchaseItemCard
                              token={token}
                              card={item}
                              status={1}
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
