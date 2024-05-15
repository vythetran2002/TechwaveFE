import React, { useState } from "react";
import Head from "next/head";
import UserLayout from "@/components/layout/UserLayout";
import Layout from "@/components/layout/Layout";
import Styles from "./style.module.css";
import FavouriteItemCard from "@/components/ui/FavouriteItemCard/FavouriteItemCard";
import useFetchUserProfile from "@/api/user/useFetchUserProfile";
import useFetchUserFavProduct from "@/api/user/useFetchFavProduct";
import { DeleteFavouriteItem } from "@/api/user/deleteFavouriteProduct";
import toast, { Toaster } from "react-hot-toast";
import { Delete } from "@mui/icons-material";
import { Empty } from "antd";
import Cookies from "js-cookie";

function Index() {
  const token = Cookies.get("token");
  const user = useFetchUserProfile();
  const products = useFetchUserFavProduct();

  // console.log(products);

  const handlingDeleteFavouriteProduct = async (id) => {
    // try {

    const message = await DeleteFavouriteItem(id, token);
    console.log(message);
    await products.mutate();
    // } catch (error) {}
  };

  //states
  const [topAllCheckBox, setTopAllCheckBox] = useState(false);

  if (products.isLoading) {
    return <>Loading</>;
  }
  if (products.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <Head>
          <title>Danh sách yêu thích</title>
        </Head>
        <UserLayout user={user} path={"/favourite"}>
          <Toaster />
          <div className={Styles["profile-right-edit-form-wrapper"]}>
            <div className={Styles["profile-title-container"]}>
              <span style={{ fontWeight: "400", fontSize: "20px" }}>
                Danh sách yêu thích của tôi
              </span>
              <span>Quản lý danh sách yêu thích</span>
            </div>
            <div className={Styles["product-nav-item-container"]}>
              <div className={Styles["product-nav-container"]}>
                <div className={Styles["checkbox-name-wrapper"]}>
                  {/* <Checkbox
                        className="flex03 center"
                        checked={topAllCheckBox}
                        onChange={handlingChangeTopAllCheckBox}
                      /> */}
                  <span className="flex1 center">Sản phẩm</span>
                </div>
                <div className={Styles["remain-detail-wrapper"]}>
                  <span className="flex1 center">Đơn giá</span>
                  <span className="flex1 center">Số lượng</span>
                  <span className="flex1 center">Xuất sứ</span>
                  <span className="flex1 center">Thao tác</span>
                </div>
              </div>
              <div className={Styles["overflow-y"]}>
                {products.data ? (
                  products.data.data ? (
                    products.data.data.map((product, index) => {
                      if (product.product) {
                        return (
                          <React.Fragment key={"productItem" + index}>
                            <FavouriteItemCard
                              onClickDelete={handlingDeleteFavouriteProduct}
                              checked={topAllCheckBox}
                              product={product}
                            />
                          </React.Fragment>
                        );
                      }
                    })
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        padding: "20px",
                      }}
                    >
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                  )
                ) : (
                  <>Loading</>
                )}
              </div>
              {/* <FavouriteCardPopUp
                  checked={topAllCheckBox}
                  handlingChange={handlingChangeTopAllCheckBox}
                /> */}
            </div>
          </div>
        </UserLayout>
      </>
    );
}

export default Index;
