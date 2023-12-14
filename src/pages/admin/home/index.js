import React, { useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
import AdminHeader from "@/components/global/Header/admin/Header";
import AdminSidebar from "@/components/global/Sidebar/admin/Sidebar";
import Circle from "react-circle";
import Image from "next/image";
import images from "@/assets/images";
import TestDialog from "@/pages/Test/dialog";
import OrdersChart from "@/components/ui/admin/chart/admin/OrdersChart";
import { Toaster } from "react-hot-toast";
import useFetchAdminProfile from "@/api/admin/useFetchAdminProfile";

function Index() {
  const admin = useFetchAdminProfile();
  // console.log(admin);

  if (admin.isLoading) {
    return <>Loading</>;
  }
  if (admin.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <Head>
          <title>Techwave - Admin</title>
        </Head>
        <AdminLayout path={"/home"}>
          <Toaster />
          <div className={Styles["body-container"]}>
            <div className={Styles["left-body-container"]}>
              <div className={Styles["left-body-item-container"]}>
                <span className={Styles["left-body-item-title"]}>THỐNG KÊ</span>
                <div className={Styles["left-body-item-list-card"]}>
                  <div className={Styles["left-body-item-card-container"]}>
                    <div className={Styles["left-body-item-card-wrapper"]}>
                      <div className={Styles["left-body-item-card-status"]}>
                        <div className={Styles["left-body-item-card-info"]}>
                          <h3>Doanh thu</h3>
                          <h1>$12,05</h1>
                        </div>
                        <div className={Styles["left-body-item-card-circle"]}>
                          <Circle
                            progress={67}
                            animate={true}
                            animationDuration="2s"
                            size="100"
                            responsive={false}
                            progressColor="rgb(28,157,133)"
                            roundedStroke={true}
                            showPercentage={true}
                            showPercentageSymbol={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={Styles["left-body-item-card-container"]}>
                    <div className={Styles["left-body-item-card-wrapper"]}>
                      <div className={Styles["left-body-item-card-status"]}>
                        <div className={Styles["left-body-item-card-info"]}>
                          <h3>Truy cập</h3>
                          <h1>12,989</h1>
                        </div>
                        <div className={Styles["left-body-item-card-circle"]}>
                          <Circle
                            progress={35}
                            animate={true}
                            animationDuration="2s"
                            size="100"
                            responsive={false}
                            progressColor="rgb(254,43,97)"
                            roundedStroke={true}
                            showPercentage={true}
                            showPercentageSymbol={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={Styles["left-body-item-card-container"]}>
                    <div className={Styles["left-body-item-card-wrapper"]}>
                      <div className={Styles["left-body-item-card-status"]}>
                        <div className={Styles["left-body-item-card-info"]}>
                          <h3>Tìm kiếm</h3>
                          <h1>1,986</h1>
                        </div>
                        <div className={Styles["left-body-item-card-circle"]}>
                          <div className={Styles["left-body-item-card-circle"]}>
                            <Circle
                              progress={78}
                              animate={true}
                              animationDuration="2s"
                              size="100"
                              responsive={false}
                              progressColor="rgb(107,155,208)"
                              roundedStroke={true}
                              showPercentage={true}
                              showPercentageSymbol={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={Styles["left-body-item-container"]}>
                <span className={Styles["left-body-item-title"]}>ĐƠN HÀNG</span>
                <div className={Styles["left-body-chart-item"]}>
                  <OrdersChart />
                </div>
              </div>
            </div>
            <div className={Styles["right-body-container"]}>
              <div className={Styles["profile-container"]}>
                <div className={Styles["avatar-wrapper"]}>
                  {admin.data.avatar != null ? (
                    <>
                      <Image
                        width={200}
                        height={200}
                        src={admin.data.avatar}
                        alt=""
                        priority={true}
                        className={Styles["avatar"]}
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        width={200}
                        height={200}
                        src={images.nonAvatar}
                        alt=""
                        priority={true}
                        className={Styles["avatar"]}
                      />
                    </>
                  )}

                  <div>
                    <h2>{admin.data.username}</h2>
                    <p style={{ margin: "0" }}>ADMIN</p>
                  </div>
                </div>
              </div>
              <div className={Styles["right-new-accounts-container"]}>
                <span className={Styles["right-new-account-title"]}>
                  VENDORS MỚI
                </span>
                <div className={Styles["right-new-account-list-container"]}>
                  <div className={Styles["right-new-account-item"]}>
                    <Image
                      width={200}
                      height={200}
                      src={images.monster}
                      className={Styles["account-avatar"]}
                      alt=""
                      priority
                    />
                    <div className={Styles["right-new-account-info"]}>
                      <span className={Styles["info-name"]}>AST Shop</span>
                      <span className={Styles["info-time"]}>32 min ago</span>
                    </div>
                  </div>
                  <div className={Styles["right-new-account-item"]}>
                    <Image
                      width={200}
                      height={200}
                      src={images.monster}
                      className={Styles["account-avatar"]}
                      alt=""
                      priority
                    />
                    <div className={Styles["right-new-account-info"]}>
                      <span className={Styles["info-name"]}>AST Shop</span>
                      <span className={Styles["info-time"]}>32 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={Styles["right-new-accounts-container"]}>
                <span className={Styles["right-new-account-title"]}>
                  USERS MỚI
                </span>
                <div className={Styles["right-new-account-list-container"]}>
                  <div className={Styles["right-new-account-item"]}>
                    <Image
                      width={200}
                      height={200}
                      src={images.monster}
                      className={Styles["account-avatar"]}
                      alt=""
                      priority
                    />
                    <div className={Styles["right-new-account-info"]}>
                      <span className={Styles["info-name"]}>John Doe</span>
                      <span className={Styles["info-time"]}>32 min ago</span>
                    </div>
                  </div>
                  <div className={Styles["right-new-account-item"]}>
                    <Image
                      width={200}
                      height={200}
                      src={images.monster}
                      className={Styles["account-avatar"]}
                      alt=""
                      priority
                    />
                    <div className={Styles["right-new-account-info"]}>
                      <span className={Styles["info-name"]}>John Doe</span>
                      <span className={Styles["info-time"]}>32 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AdminLayout>
      </>
    );
}

export default Index;
