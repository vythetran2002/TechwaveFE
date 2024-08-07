import React from "react";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { useEffect } from "react";
import Styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import useFetchSearchProduct from "@/api/useFetchSearchProduct";
import CustomLoader from "@/components/ui/CustomLoader/CustomLoader";
import { Empty } from "antd";
import Item from "@/components/ui/ItemList/Item/Item";
import ItemDetail from "@/components/ui/ItemList/Item/ItemDetail/ItemDetail";
import Cookies from "js-cookie";
import { addFavouriteProduct } from "@/api/user/addFavouriteProduct";
import { addCartItem } from "@/api/user/addCartItem";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "@/api/useFetch";
import Link from "next/link";
import useFetchCart from "@/api/user/useFetchCart";
import CozeChat from "@/components/ui/CozeChat/CozeChat";

function index() {
  const token = Cookies.get("token");
  const [detailItem, setDeTailItem] = useState(null);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [img, setImg] = useState(null);
  const { mutate } = useFetchCart();
  const [reload, setReload] = useState(false);
  const router = useRouter();
  const name = router.query.name;
  const result = useFetchSearchProduct(name);
  const cates = useFetch(process.env.NEXT_PUBLIC_API_URL + "/api/category");
  // console.log(cates);
  const handlingOpenDialog = () => {
    setIsOpenDialog(true);
  };
  const updateImg = (value) => {
    setImg(value);
    setReload(!reload);
  };

  const handlingAddFavouriteProduct = (id) => {
    const message = addFavouriteProduct(id, token);
  };

  const handlingCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handlingAddCartItem = async (data, stock) => {
    // console.log(data);
    if (stock > 0) {
      try {
        const message = await addCartItem(data, token);
        await mutate();
        // console.log(data);
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
    } else {
      toast.error("Xin lỗi, mặt hàng hiện tại đã hết");
    }
  };

  useEffect(() => {
    setReload(!reload);
  }, [img]);

  if (result.loading) {
    return <CustomLoader />;
  }
  if (result.error) {
    return <>Error</>;
  } else
    return (
      <>
        <Head>
          <title>Kết quả từ khoá: {name}</title>
        </Head>
        <Layout>
          <Toaster />
          <div className={Styles["search-container"]}>
            <div className={Styles["search-wrapper"]}>
              {result.data.results.length != 0 ? (
                <div className={Styles["data-container"]}>
                  <span className={Styles["data-text"]}>
                    Có {result.data.results.length} sản phẩm với từ khoá: {name}
                  </span>
                  <div className={Styles["item-list-cate-container"]}>
                    <div className={Styles["nav-container"]}>
                      {cates.data ? (
                        cates.data.map((cate, index) => {
                          return (
                            <Link
                              key={"cate" + cate.category_id}
                              href={"/cate/" + cate.category_id}
                              className={`${Styles["nav-item"]} ${Styles["active"]}`}
                            >
                              {cate.name}
                            </Link>
                          );
                        })
                      ) : (
                        <>
                          <Empty />
                        </>
                      )}
                    </div>
                    <div className={Styles["item-list-container"]}>
                      {result.data.results.map((item, index) => {
                        console.log(item);
                        return (
                          <React.Fragment key={"item-card" + index}>
                            <Item
                              mutate={result.mutate}
                              addFavourite={handlingAddFavouriteProduct}
                              addCartItem={handlingAddCartItem}
                              item={item}
                              token={token}
                              setDeTailItem={setDeTailItem}
                              handlingOpenDialog={handlingOpenDialog}
                            />
                          </React.Fragment>
                        );
                      })}
                    </div>
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
            img={img}
            updateImg={updateImg}
            addCartItem={handlingAddCartItem}
            item={detailItem}
            isOpenDialog={isOpenDialog}
            handlingOpenDialog={handlingOpenDialog}
            handlingCloseDialog={handlingCloseDialog}
          />
          <CozeChat isVisible={true} />
        </Layout>
      </>
    );
}

export default index;
