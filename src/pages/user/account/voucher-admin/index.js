import React from "react";
import Head from "next/head";
import UserLayout from "@/components/layout/UserLayout";
import Styles from "../favourites/style.module.css";
import PurchaseItemCard from "@/components/ui/PurchaseItemCard/PurchaseItemCard";
import useFetchUserProfile from "@/api/user/useFetchUserProfile";
import useFetchCanceledOrders from "@/api/user/useFetchCanceledOrders";
import { Empty } from "antd";
import { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import VoucherCard from "@/components/ui/voucher-card/VoucherCard";
import { useRouter } from "next/router";

function Index() {
  const user = useFetchUserProfile();
  const orders = useFetchCanceledOrders();
  const [cookie] = useCookies();
  const route = useRouter();
  // const router = useRouter();
  // const { query } = router;

  const handleGoToVendor = () => {
    route.push("/user/account/vouchers");
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
          <title>Phiếu giảm giá của tôi</title>
        </Head>
        <UserLayout user={user} path={"/vouchers"}>
          <Toaster />

          <div className={Styles["profile-right-edit-form-wrapper"]}>
            <div className={Styles["voucher-title-container"]}>
              <div className={`${Styles["profile-title-container"]} `}>
                <span style={{ fontWeight: "400", fontSize: "20px" }}>
                  Danh sách đơn hàng
                </span>
                <span>Quản lý danh sách đơn hàng</span>
              </div>
              <div className={Styles["voucher-nav-container"]}>
                <div
                  className={`${Styles["shop-voucher-nav"]}  `}
                  onClick={handleGoToVendor}
                >
                  Voucher của shop
                </div>
                <div
                  className={`${Styles["shop-voucher-nav"]}  ${Styles["active-voucher-nav"]}`}
                >
                  Voucher của Techwave
                </div>
              </div>
            </div>
            <div className={Styles["vouchers-card-container"]}>
              <VoucherCard role="admin" />
              <VoucherCard role="admin" />
              <VoucherCard role="admin" />
            </div>
          </div>
        </UserLayout>
      </>
    );
}

export default Index;
