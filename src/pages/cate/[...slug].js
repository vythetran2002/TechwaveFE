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
import Cookies from "js-cookie";
import { addFavouriteProduct } from "@/api/user/addFavouriteProduct";
import useFetchCateListByPage from "@/api/user/useFetchCateListByPage";

function CateIndex() {
  const router = useRouter();
  const token = Cookies.get("token");
  const [img, setImg] = useState(null);
  const [reload, setReload] = useState(false);
  const [detailItem, setDeTailItem] = useState(null);
  const [quantity, setQuantity] = useState(5);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const slug = router.query.slug;
  // console.log(slug);
  let id0 = null;
  let id1 = null;
  if (Array.isArray(slug) && slug.length > 0) {
    id0 = slug[0];
    id1 = slug[1];
  }

  // const listItem = useFetch("http://localhost:3000/api/category/" + slug);
  const listItem = useFetchCateListByPage(id0, id1, page, 10, token);
  const cateList = useFetch(process.env.NEXT_PUBLIC_API_URL + "/api/category");

  const handlingOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handlingAddFavouriteProduct = (id) => {
    console.log("----");
    const message = addFavouriteProduct(id, token);
    console.log(message);
  };

  const handlingCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handlingAddCartItem = async (data) => {
    console.log("----");
    try {
      const message = await addCartItem(data, token);
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

  const updateImg = (value) => {
    setImg(value);
  };

  useEffect(() => {
    if (listItem.data) {
      console.log("---");
      if (listItem.data.data) {
        updateMax(listItem.data.data.total);
      }
    }
    setReload(!reload);
  }, [listItem.data, img]);

  if (!slug) {
    return <></>;
  }

  if (cateList.isError) return <>Error</>;
  if (cateList.isLoading) return <>Loading</>;
  else
    return (
      <>
        <Head>
          {listItem.data && listItem.data.data ? (
            <title>{listItem.data.listCate.name}</title>
          ) : (
            <title>Techwave - Category</title>
          )}
        </Head>
        <Layout>
          <Toaster />
          <div className={Styles["filter-container"]}>
            <div className={Styles["filter-wrapper"]}>
              <div className={Styles["nav-container"]}>
                {listItem.data ? (
                  !id1 ? (
                    <React.Fragment>
                      <Link
                        href={"/cate/" + listItem.data.listCate.category_id}
                        className={`${Styles["nav-item"]} ${Styles["active"]}`}
                      >
                        {listItem.data.listCate.name}
                      </Link>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Link
                        href={"/cate/" + listItem.data.listCate.category_id}
                        className={`${Styles["nav-item"]} `}
                      >
                        {listItem.data.listCate.name}
                      </Link>
                    </React.Fragment>
                  )
                ) : (
                  <></>
                )}
                {listItem.data ? (
                  listItem.data.listCate.cate_child ? (
                    listItem.data.listCate.cate_child.map((cate, index) => {
                      if (cate.category_id == id1) {
                        return (
                          <React.Fragment key={"cate-item" + index}>
                            <Link
                              href={
                                "/cate/" +
                                listItem.data.listCate.category_id +
                                "/" +
                                cate.category_id
                              }
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
                              href={
                                "/cate/" +
                                listItem.data.listCate.category_id +
                                "/" +
                                cate.category_id
                              }
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
                    <></>
                  )
                ) : (
                  <>Empty</>
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
                  {listItem.data && listItem.data.data.results.length != 0 ? (
                    listItem.data.data.results.map((item, index) => {
                      return (
                        <React.Fragment key={"item-card" + index}>
                          <Item
                            addFavourite={handlingAddFavouriteProduct}
                            addCartItem={handlingAddCartItem}
                            item={item}
                            img={img}
                            updateImg={updateImg}
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
            img={img}
            updateImg={updateImg}
            isOpenDialog={isOpenDialog}
            handlingOpenDialog={handlingOpenDialog}
            handlingCloseDialog={handlingCloseDialog}
          />
        </Layout>
      </>
    );
}

export default CateIndex;
