import React, { useEffect } from "react";
import Styles from "./style.module.css";
import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import Item from "@/components/ui/ItemList/Item/Item";
import { useState } from "react";
import { Pagination } from "@mui/material";
import ItemDetail from "@/components/ui/ItemList/Item/ItemDetail/ItemDetail";
import useFetch from "@/api/useFetch";
import { useRouter } from "next/router";
import useFetchProductById from "@/api/products/useFetchProductById";
import useFetchProductByCateId from "@/api/products/useFetchProductByCateId";
import index from "../admin/home";
import Empty from "antd/lib/empty";
import { addCartItem } from "@/api/user/addCartItem";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { addFavouriteProduct } from "@/api/user/addFavouriteProduct";
import useFetchCateListByPage from "@/api/user/useFetchCateListByPage";

function Index() {
  const [cookies] = useCookies();
  const cateList = useFetch("http://localhost:3000/api/category");
  const router = useRouter();
  const slug = router.query.slug;
  const [detailItem, setDeTailItem] = useState(null);
  const [quantity, setQuantity] = useState(5);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState();
  // const listItem = useFetch("http://localhost:3000/api/category/" + slug);
  const listItem = useFetchCateListByPage(slug, page, 10, cookies["token"]);

  const [isOpenDialog, setIsOpenDialog] = useState(false);

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

  const updateQuantity = (value) => {
    setQuantity(value);
  };

  const handlePaging = async (value, pageSize) => {
    await setPage(pageSize);
  };

  const updateMax = (value) => {
    setMax(value);
  };

  useEffect(() => {
    if (listItem.data) {
      console.log("---");
      if (listItem.data.data) {
        updateMax(listItem.data.data.total);
      }
    }
  }, [listItem.data]);

  if (cateList.isError) return <>Error</>;
  if (cateList.isLoading) return <>Loading</>;

  return (
    <>
      <Head>
        {listItem.data && listItem.data.data ? (
          <title>{listItem.data.listCate.slug}</title>
        ) : (
          <title>Techwave - Category</title>
        )}
      </Head>
      <Layout>
        <Toaster />
        <div className={Styles["filter-container"]}>
          <div className={Styles["filter-wrapper"]}>
            <div className={Styles["nav-container"]}>
              {cateList.data ? (
                cateList.data.map((cate, index) => {
                  if (cate.category_id == slug) {
                    return (
                      <React.Fragment key={"cate-item" + index}>
                        <Link
                          href={"/cate/" + cate.category_id}
                          key={index + cate}
                          className={`${Styles["nav-item"]} ${Styles["active"]}`}
                        >
                          {cate.name}
                        </Link>
                      </React.Fragment>
                    );
                  } else {
                    return (
                      <React.Fragment key={"cate-item" + index}>
                        <Link
                          href={"/cate/" + cate.category_id}
                          key={index + cate}
                          className={Styles["nav-item"]}
                        >
                          {cate.name}
                        </Link>
                      </React.Fragment>
                    );
                  }
                })
              ) : (
                <>Null</>
              )}
            </div>
            <div className={Styles["filter-list-container"]}>
              <div className={Styles["filter-heading-container"]}>
                <span>Sắp xếp theo</span>
                <Link
                  href={""}
                  className={`${Styles["filter-button"]} ${Styles["active"]}`}
                >
                  Phổ biến
                </Link>
                <Link href={""} className={`${Styles["filter-button"]} `}>
                  Mới nhất
                </Link>
                <Link href={""} className={`${Styles["filter-button"]} `}>
                  Bán chạy
                </Link>
              </div>
              <div className={Styles["filter-item-list-container"]}>
                {listItem.data && listItem.data.data ? (
                  listItem.data.data.results.map((item, index) => {
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
                  })
                ) : (
                  <div style={{ width: "100%", padding: "20px 0 20px 0" }}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )}
                {/* <Item
                // error={props.isError}
                // loading={props.isLoading}
                // handlingOpenDialog={handlingOpenDialog}
                // setDeTailItem={props.setDeTailItem}
                // item={item}
                /> */}
              </div>
              <div className={Styles["pagination-container"]}>
                {page && (
                  <Pagination
                    onChange={handlePaging}
                    count={max}
                    size="large"
                  />
                )}
              </div>
              <div></div>
            </div>
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

export default Index;
