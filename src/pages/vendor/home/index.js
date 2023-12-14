import React from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
import Circle from "react-circle";
import Image from "next/image";
import images from "@/assets/images";
import TestDialog from "@/pages/Test/dialog";
import OrdersChart from "@/components/ui/admin/chart/OrdersChart";
import useFetchVendorProfile from "@/api/vendor/useFetchVendorProfile";
import { Toaster } from "react-hot-toast";
import useFetchStatistic from "@/api/vendor/useFetchStatistic";
import CustomLoader from "@/components/ui/CustomLoader/CustomLoader";

function Index() {
  const vendor = useFetchVendorProfile();
  const statistic = useFetchStatistic();

  if (vendor.isLoading) {
    return (
      <>
        <CustomLoader />
      </>
    );
  }
  if (vendor.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <Head>
          <title>Techwave - Vendor</title>
        </Head>
        <VendorLayout path={"/home"}>
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
                          {statistic.data && (
                            <h1>${statistic.data.statistic.revenue}</h1>
                          )}
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
                          <h3>Khách Hàng</h3>
                          {statistic.data && (
                            <h1>{statistic.data.statistic.countCustomer}</h1>
                          )}
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
                          <h3>Tồn kho</h3>
                          {statistic.data && (
                            <h1>{statistic.data.statistic.inventories}</h1>
                          )}
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
                  {statistic.data ? (
                    <OrdersChart
                      info={statistic.data.statistic.ordersStatistic}
                    />
                  ) : (
                    <>
                      <CustomLoader />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={Styles["right-body-container"]}>
              <div className={Styles["profile-container"]}>
                <div className={Styles["avatar-wrapper"]}>
                  {vendor.data.avatar != null ? (
                    <>
                      <Image
                        src={vendor.data.avatar}
                        alt=""
                        width={1000}
                        height={1000}
                        priority={true}
                        className={Styles["avatar"]}
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        src={images.nonAvatar}
                        alt=""
                        priority={true}
                        className={Styles["avatar"]}
                      />
                    </>
                  )}

                  <div>
                    <h2>{vendor.data.username}</h2>
                    <p style={{ margin: "0" }}>VENDOR</p>
                  </div>
                </div>
              </div>
              <div className={Styles["right-new-accounts-container"]}>
                <span className={Styles["right-new-account-title"]}>
                  ĐƠN HÀNG MỚI
                </span>
                <div className={Styles["right-new-account-list-container"]}>
                  <div className={Styles["right-new-account-item"]}>
                    <Image
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
                  FOLLOWERS MỚI
                </span>
                <div className={Styles["right-new-account-list-container"]}>
                  <div className={Styles["right-new-account-item"]}>
                    <Image
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
        </VendorLayout>
      </>
    );
}

export default Index;
