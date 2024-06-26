import React, { useState } from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
import Circle from "react-circle";
import Image from "next/image";
import images from "@/assets/images";
import TestDialog from "@/pages/Test/dialog";
import SalesChart from "@/components/ui/admin/chart/SalesChart";
import useFetchVendorProfile from "@/api/vendor/useFetchVendorProfile";
import { Toaster } from "react-hot-toast";
import useFetchStatistic from "@/api/vendor/useFetchStatistic";
import CustomLoader from "@/components/ui/CustomLoader/CustomLoader";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import { Select } from "antd";
import { ProductsChart } from "@/components/ui/admin/chart/ProductsChart";
import {
  MoneyCollectOutlined,
  UsergroupAddOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Textfit } from "react-textfit";
// const mokedRevenue = {
//   data: {
//     revenue: 2000000, // Doanh thu
//     countCustomer: 10, // So luong KH
//     inventories: 20, // So luong SP
//     saleStatitics: {
//       year: [
//         1000000, 1000002, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000,
//         1000000, 1000000, 1000000, 1000000,
//       ], //Thong ke doanh thu theo nam - gom 12 thang
//       month: [
//         1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
//         22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
//       ], //Thong ke doanh thu theo thang - gom 28 hoac 31 ngay tuy theo thang
//     }, // Thong ke doanh thu
//     orderStatitics: {
//       data: [2, 25, 4, 50], // So luong don hang lan luot: BI HUY (status=3 va 4), DA DUYET (status=1), CHUA DUOC DUYET (status=0), DON HANG THANH CONG (status=2)
//     }, // Thong ke don hang
//   },
//   isError: null,
//   isLoading: null,
// };

function Index() {
  const [option, setOption] = useState(1);

  const vendor = useFetchVendorProfile();
  const statistic = useFetchStatistic();

  const onChangeOption = (value) => {
    setOption(value);
  };

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
                            <h1>
                              {FormatPrice(statistic.data.statistic.revenue)}
                            </h1>
                          )}
                        </div>
                        <div className={Styles["left-body-item-card-circle"]}>
                          {/* <Circle
                            progress={67}
                            animate={true}
                            animationDuration="2s"
                            size="100"
                            responsive={false}
                            progressColor="rgb(28,157,133)"
                            roundedStroke={true}
                            showPercentage={true}
                            showPercentageSymbol={true}
                          /> */}
                          {/* <div className={Styles["icon-container"]}>
                            <MoneyCollectOutlined
                              style={{
                                fontSize: "65px",
                                color: "#047857",
                              }}
                            />
                          </div> */}
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
                        <div
                          className={Styles["left-body-item-card-circle"]}
                          style={{ width: 100, height: 100 }}
                        >
                          <div className={Styles["icon-container"]}>
                            <UsergroupAddOutlined
                              style={{
                                fontSize: "65px",
                                color: "#dc2626",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={Styles["left-body-item-card-container"]}>
                    <div className={Styles["left-body-item-card-wrapper"]}>
                      <div className={Styles["left-body-item-card-status"]}>
                        <div className={Styles["left-body-item-card-info"]}>
                          <h3>Sản phẩm</h3>
                          {statistic.data && (
                            <h1>{statistic.data.statistic.inventories}</h1>
                          )}
                        </div>
                        <div className={Styles["left-body-item-card-circle"]}>
                          <div className={Styles["left-body-item-card-circle"]}>
                            <div className={Styles["icon-container"]}>
                              <TableOutlined
                                style={{
                                  fontSize: "65px",
                                  color: "#0369a1",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={Styles["left-body-item-container"]}>
                <div className={Styles["revenue-date-container"]}>
                  <span className={Styles["left-body-item-title"]}>
                    THỐNG KÊ DOANH THU THEO
                  </span>
                  <Select
                    onChange={onChangeOption}
                    style={{
                      width: 120,
                    }}
                    size="large"
                    defaultValue={option}
                    options={[
                      {
                        value: 0,
                        label: "Tháng",
                      },
                      {
                        value: 1,
                        label: "Năm",
                      },
                    ]}
                  ></Select>
                </div>

                <div className={Styles["left-body-chart-item"]}>
                  {statistic.data ? (
                    <SalesChart
                      stats={statistic.data.statistic.saleStatitics}
                      option={option}
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
                  Thống KÊ ĐƠN HÀNG
                </span>
                <div className={Styles["right-new-account-list-container"]}>
                  {statistic.data ? (
                    <ProductsChart
                      stats={statistic.data.statistic.ordersStatistic}
                      option={option}
                    />
                  ) : (
                    <>
                      <CustomLoader />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </VendorLayout>
      </>
    );
}

export default Index;
