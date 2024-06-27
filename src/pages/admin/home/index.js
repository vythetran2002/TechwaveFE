import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
import AdminHeader from "@/components/global/Header/admin/Header";
import AdminSidebar from "@/components/global/Sidebar/admin/Sidebar";
import Image from "next/image";
import images from "@/assets/images";
import TestDialog from "@/pages/Test/dialog";
import RegisterChart from "@/components/ui/admin/chart/admin/RegisterChart";
import { Toaster } from "react-hot-toast";
import { Select } from "antd";
import useFetchAdminProfile from "@/api/admin/useFetchAdminProfile";
import useFetchAdminStatitics from "@/api/admin/useFetchAdminStatitics";

import {
  MoneyCollectOutlined,
  UsergroupAddOutlined,
  TableOutlined,
  UserOutlined,
  ShopOutlined,
  GoldOutlined,
  CommentOutlined,
  FlagOutlined,
  TagOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

// const mockedData = {
//   data: {
//     totalUsers: 200, // tong tk users
//     totalVendors: 15, // tong tk vendors
//     totalCates: 12, // So luong SP
//     totalComments: 100, // So luong danh gia
//     totalReports: 21, // So luong bao cao
//     totalDiscounts: 5, // So luong voucher giam gia
//     registerStatitics: {
//       year: {
//         user: [1, 2, 3, 4, 5, 1, 7, 8, 2, 8, 11, 12], // total luot dang ki user tu thang 1 - 12
//         vendor: [1, 1, 3, 4, 5, 6, 2, 8, 9, 0, 11, 12], // total luot dang ki vendor tu thang 1 - 12
//       },
//       month: {
//         user: [
//           1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
//           22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
//         ], // total luot dang ki user cac ngay trong thang hien tai (28-31 ngay)
//         vendor: [
//           1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
//           22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
//         ], // total luot dang ki vendor cac ngay trong thang hien tai (28-31 ngay)
//       },
//     }, // Thong ke Luong nguoi dang ky
//   },
//   isError: null,
//   isLoading: null,
// };

function Index() {
  const [option, setOption] = useState(1);
  const admin = useFetchAdminProfile();
  const statitics = useFetchAdminStatitics();
  // console.log(admin);

  const onChangeOption = (value) => {
    setOption(value);
  };

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
                          <h3>Tổng số Users</h3>
                          {statitics.data ? (
                            <h1>{statitics.data.totalUsers}</h1>
                          ) : (
                            <LoadingOutlined style={{ fontSize: "40px" }} />
                          )}
                        </div>
                        <div className={Styles["left-body-item-card-circle"]}>
                          <div className={Styles["icon-container"]}>
                            <UserOutlined
                              style={{
                                fontSize: "65px",
                                color: "#0284c7",
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
                          <h3>Tổng số Vendors</h3>
                          {statitics.data ? (
                            <h1>{statitics.data.totalVendors}</h1>
                          ) : (
                            <LoadingOutlined style={{ fontSize: "40px" }} />
                          )}
                        </div>
                        <div className={Styles["left-body-item-card-circle"]}>
                          <div className={Styles["icon-container"]}>
                            <ShopOutlined
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
                          <h3>Tổng số danh mục</h3>
                          {statitics.data ? (
                            <h1>{statitics.data.totalCates}</h1>
                          ) : (
                            <LoadingOutlined style={{ fontSize: "40px" }} />
                          )}
                        </div>
                        <div className={Styles["left-body-item-card-circle"]}>
                          <div className={Styles["icon-container"]}>
                            <GoldOutlined
                              style={{
                                fontSize: "65px",
                                color: "#16a34a",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={Styles["left-body-item-container"]}>
                <span className={Styles["left-body-item-title"]}>
                  <span>THỐNG KÊ LƯỢT ĐĂNG KÍ THEO</span>
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
                </span>
                <div className={Styles["left-body-chart-item"]}>
                  {statitics.data && (
                    <>
                      <RegisterChart
                        option={option}
                        stats={statitics.data.registerStatitics}
                      />
                    </>
                  )}
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
                <div
                  className={Styles["left-body-item-card-container"]}
                  style={{ width: "100%" }}
                >
                  <div className={Styles["left-body-item-card-wrapper"]}>
                    <div className={Styles["left-body-item-card-status"]}>
                      <div className={Styles["left-body-item-card-info"]}>
                        <h3>Tổng lượt đánh giá</h3>
                        {statitics.data ? (
                          <h1>{statitics.data.totalComments}</h1>
                        ) : (
                          <LoadingOutlined style={{ fontSize: "40px" }} />
                        )}
                      </div>
                      <div className={Styles["left-body-item-card-circle"]}>
                        <div className={Styles["icon-container"]}>
                          <CommentOutlined
                            style={{
                              fontSize: "65px",
                              color: "#0284c7",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={Styles["right-new-accounts-container"]}>
                <div
                  className={Styles["left-body-item-card-container"]}
                  style={{ width: "100%" }}
                >
                  <div className={Styles["left-body-item-card-wrapper"]}>
                    <div className={Styles["left-body-item-card-status"]}>
                      <div className={Styles["left-body-item-card-info"]}>
                        <h3>Tổng lượt báo cáo</h3>
                        {statitics.data ? (
                          <h1>{statitics.data.totalReports}</h1>
                        ) : (
                          <LoadingOutlined style={{ fontSize: "40px" }} />
                        )}
                      </div>
                      <div className={Styles["left-body-item-card-circle"]}>
                        <div className={Styles["icon-container"]}>
                          <FlagOutlined
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
              </div>
              <div className={Styles["right-new-accounts-container"]}>
                <div
                  className={Styles["left-body-item-card-container"]}
                  style={{ width: "100%" }}
                >
                  <div className={Styles["left-body-item-card-wrapper"]}>
                    <div className={Styles["left-body-item-card-status"]}>
                      <div className={Styles["left-body-item-card-info"]}>
                        <h3>Tổng Voucher khuyến mãi</h3>
                        {statitics.data ? (
                          <h1>{statitics.data.totalDiscounts}</h1>
                        ) : (
                          <LoadingOutlined style={{ fontSize: "40px" }} />
                        )}
                      </div>
                      <div className={Styles["left-body-item-card-circle"]}>
                        <div className={Styles["icon-container"]}>
                          <TagOutlined
                            style={{
                              fontSize: "65px",
                              color: "#0d9488",
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
        </AdminLayout>
      </>
    );
}

export default Index;
