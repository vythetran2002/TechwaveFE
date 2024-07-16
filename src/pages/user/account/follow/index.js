import React from "react";
import Head from "next/head";
import UserLayout from "@/components/layout/UserLayout";
import Styles from "../favourites/style.module.css";
import FollowShopCard from "@/components/ui/FollowShopCard/FollowShopCard";
import useFetchUserFollowVendor from "@/api/user/useFetchFollowVendor";
import { RemoveFollowVendor } from "@/api/user/removeFollowVendor";
import useFetchUserProfile from "@/api/user/useFetchUserProfile";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
const Empty = dynamic(() => import("antd/lib/empty"), { ssr: false });
import FullScreenLoader from "@/components/ui/FullScreenLoader/FullScreenLoader";
import Cookies from "js-cookie";

function Index() {
  const token = Cookies.get("token");
  const vendors = useFetchUserFollowVendor();
  const user = useFetchUserProfile();

  const handlingUnfollow = async (id) => {
    try {
      const message = await RemoveFollowVendor(id, token);
      console.log(message);
      await vendors.mutate();
      // toast.success("Unfollowed");
      // window.location.reload();
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };
  if (vendors.isLoading) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <UserLayout user={user} path={"/follows"}>
          <FullScreenLoader />
        </UserLayout>
      </>
    );
  }
  if (vendors.isError) {
    return <>Error</>;
  }

  return (
    <>
      <Head>
        <title>Theo dõi của tôi</title>
      </Head>
      <UserLayout user={user} path={"/follows"}>
        <Toaster />

        <div className={Styles["profile-right-edit-form-wrapper"]}>
          <div className={Styles["profile-title-container"]}>
            <span style={{ fontWeight: "400", fontSize: "20px" }}>
              Theo dõi của tôi
            </span>
            <span>Quản lý danh sách theo dõi</span>
          </div>
          <div className={Styles["follow-shop-item-container"]}>
            {vendors.data ? (
              vendors.data.length != 0 ? (
                vendors.data.map((vendor, index) => {
                  return (
                    <React.Fragment key={"vendor" + index}>
                      <FollowShopCard
                        vendorId={vendor.store.account_id}
                        avatar={vendor.store.avatar}
                        name={vendor.store.username}
                        onClickUnFollow={handlingUnfollow}
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
                    padding: "40px",
                  }}
                >
                  <Empty />
                </div>
              )
            ) : (
              <>Loading</>
            )}
          </div>
        </div>
      </UserLayout>
    </>
  );
}

export default Index;
