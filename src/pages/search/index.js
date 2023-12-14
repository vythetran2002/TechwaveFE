import React from "react";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import Styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import useFetchSearchProduct from "@/api/useFetchSearchProduct";
import CustomLoader from "@/components/ui/CustomLoader/CustomLoader";
import { Empty } from "antd";
import Item from "@/components/ui/ItemList/Item/Item";
import ItemDetail from "@/components/ui/ItemList/Item/ItemDetail/ItemDetail";
import { useCookies } from "react-cookie";
import { addFavouriteProduct } from "@/api/user/addFavouriteProduct";
import { addCartItem } from "@/api/user/addCartItem";
import toast, { Toaster } from "react-hot-toast";

function index() {
  const [cookies] = useCookies();
  const [detailItem, setDeTailItem] = useState(null);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const router = useRouter();
  const name = router.query.name;
  const result = useFetchSearchProduct(name);
  console.log(result);

  const handlingOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handlingAddFavouriteProduct = (id) => {
    console.log("----");
    const message = addFavouriteProduct(id, cookies["token"]);
    console.log(message);
  };

  const handlingCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handlingAddCartItem = async (data) => {
    console.log("----");
    try {
      const message = await addCartItem(data, cookies["token"]);
      console.log(data);
      if (message) {
        toast.success("Đã thêm vào giỏ");
      } else {
        toast.error("Cần đăng nhập");
        router.push("/auth/login");
      }
    } catch (error) {
      toast.error("Cần đăng nhập");
      router.push("/auth/login");
    }
  };

  if (result.isLoading) {
    return <CustomLoader />;
  }
  if (result.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <Head></Head>
        <Layout>
          <Toaster />
          <div className={Styles["search-container"]}>
            <div className={Styles["search-wrapper"]}>
              {result.data.results.length != 0 ? (
                <div className={Styles["data-container"]}>
                  <span className={Styles["data-text"]}>
                    Có {result.data.results.length} sản phẩm với từ khoá: {name}
                  </span>
                  <div className={Styles["item-list-container"]}>
                    {result.data.results.map((item, index) => {
                      return (
                        <React.Fragment key={"item-card" + index}>
                          <Item
                            addFavourite={handlingAddFavouriteProduct}
                            addCartItem={handlingAddCartItem}
                            item={item}
                            setDeTailItem={setDeTailItem}
                            handlingOpenDialog={handlingOpenDialog}
                          />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className={Styles["nodata-container"]}>
                  <span className={Styles["nodata-text"]}>
                    Không có kết quả phù hợp với từ khoá: {name}
                  </span>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              )}
            </div>
          </div>
          <ItemDetail
            addCartItem={handlingAddCartItem}
            item={detailItem}
            isOpenDialog={isOpenDialog}
            handlingOpenDialog={handlingOpenDialog}
            handlingCloseDialog={handlingCloseDialog}
          />
        </Layout>
      </>
    );
}

export default index;
