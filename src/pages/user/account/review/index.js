import React from "react";
import Head from "next/head";
import UserLayout from "@/components/layout/UserLayout";
import Styles from "./style.module.css";
import { useRef } from "react";
import { RemoveFollowVendor } from "@/api/user/removeFollowVendor";
import useFetchUserProfile from "@/api/user/useFetchUserProfile";
import toast, { Toaster } from "react-hot-toast";
import UserReviewCard from "@/components/ui/UserReviewCard/UserReviewCard";
import useFetchUserReviews from "@/api/user/useFetchUserReviews";
import Cookies from "js-cookie";

import { Empty } from "antd";

function Index() {
  const token = Cookies.get("token");
  const reviews = useFetchUserReviews();
  // console.log(reviews);
  const user = useFetchUserProfile();

  //Refs
  const passwdRef = useRef();
  const iconRef = useRef();
  const orderingItem = useRef();
  const orderedItem = useRef();
  const itemRef = useRef();
  const pendingItem = useRef();
  const cancledItem = useRef();

  const handlingClickQLDH = () => {
    iconRef.current.classList.toggle("rt-180");
    itemRef.current.classList.toggle("show");
    orderedItem.current.classList.toggle("appear");
    orderingItem.current.classList.toggle("appear");
    pendingItem.current.classList.toggle("appear");
    cancledItem.current.classList.toggle("appear");
  };
  const handlingUnfollow = async (id) => {
    try {
      const message = RemoveFollowVendor(id, token);
      console.log(message);
      // toast.success("Unfollowed");
      window.location.reload();
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Đánh giá của tôi</title>
      </Head>
      <UserLayout user={user} path={"/reviews"}>
        <Toaster />
        <div className={Styles["profile-right-edit-form-wrapper"]}>
          <div className={Styles["profile-title-container"]}>
            <span style={{ fontWeight: "400", fontSize: "20px" }}>
              Đánh giá của tôi
            </span>
            <span>Quản lý danh sách đánh giá</span>
          </div>
          <div className={Styles["follow-shop-item-container"]}>
            {reviews.isLoading ? (
              <>Loading</>
            ) : (
              <>
                {reviews.data && reviews.data.length > 0 ? (
                  reviews.data.map((review) => {
                    return (
                      <React.Fragment key={review.review_id}>
                        <UserReviewCard review={review} />
                      </React.Fragment>
                    );
                  })
                ) : (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Empty />
                  </div>
                )}
              </>
            )}
            {/* {vendors.data ? (
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
                )} */}
          </div>
        </div>
      </UserLayout>
    </>
  );
}

export default Index;
